import { useCallback, useEffect, useRef } from "react";
import useStateWithCallBack from "./useStateWithCallBack";
import { socket } from "../components/ChatForm/ChatForm";
import { freeice } from "freeice";

export default function WebRTC(roomID) {
  const [clients, setClients] = useStateWithCallBack([]);

  const addNewClient = useCallback(
    (newClient, cb) => {
      if (!clients.includes(newClient)) {
        setClients((list) => [...list, newClient], cb);
      }
    },
    [clients, setClients]
  );

  const peerConnections = useRef({});
  const localMediaStream = useRef(null);
  const peerMediaElements = useRef({ ["LOCAL_VIDEO"]: null });

  useEffect(() => {
    async function handleNewPeer({ peerID, createOffer }) {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to pear ${peerID}`);
      }

      peerConnections.current[peerID] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      peerConnections.current[peerID].onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("relay-ice", {
            peerID,
            iceCandidate: event.candidate,
          });
        }
      };

      let tracksNumber = 0;
      peerConnections.current[peerID].ontrack = ({
        streams: [remoteStream],
      }) => {
        tracksNumber++;
        if (tracksNumber === 2) {
          //Ждем видео и аудио
          addNewClient(peerID, () => {
            peerMediaElements.current[peerID].srcObject = remoteStream;
          });
        }
      };

      localMediaStream.current.getTracks().forEach((track) => {
        peerConnections.current[peerID].addTrack(
          track,
          localMediaStream.current
        );
      });

      if (createOffer) {
        const offer = await peerConnections.current[peerID].createOffer();

        await peerConnections.current[peerID].setLocalDescription(offer);
        socket.emit("relay-sdp", {
          peerID,
          sessionDescription: offer,
        });
      }
    }

    socket.on("add-peer", handleNewPeer);
  }, []);

  useEffect(() => {
    async function setRemoteMedia({ peerID, sessionDescription }) {
      await peerConnections.current[peerID].setRemoteDescription(
        new RTCSessionDescription(sessionDescription)
      );

      if (sessionDescription.type === "offer") {
        const answer = await peerConnections.current[peerID].createAnswer();
        await peerConnections.current[peerID].setLocalDescription(answer);

        socket.emit("relay-sdp", {
          peerID,
          sessionDescription: answer,
        });
      }
    }

    socket.on("session-description", setRemoteMedia);
  }, []);

  useEffect(() => {
    socket.on("ice-candidate", (peerID, iceCandidate) => {
      peerConnections.current[peerID].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    });
  }, []);

  useEffect(() => {
    const handleRemovePeer = ({ peerID }) => {
      if (peerConnections.current[peerID]) {
        peerConnections.current[peerID].close();
      }

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      setClients((list) => list.filter((c) => c !== peerID));
    };

    socket.on("remove-peer", handleRemovePeer);
  }, []);

  useEffect(() => {
    async function startCapture() {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
        },
      });

      addNewClient("LOCAL_VIDEO", () => {
        const localVideoElement = peerMediaElements.current["LOCAL_VIDEO"];

        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    }
    startCapture()
      .then(() => socket.emit("join_web", { room: roomID }))
      .catch((e) => console.error("Error getting UserMedia:", e));

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());

      socket.emit("leave");
    };
  }, [roomID]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  return { clients, provideMediaRef };
}
