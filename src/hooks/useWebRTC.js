import { useCallback, useEffect, useRef } from "react";
import useStateWithCallBack from "./useStateWithCallBack";
import { socket } from "../components/ChatForm/ChatForm";
import freeice from "freeice";

const LOCAL_VIDEO = "LOCAL_VIDEO";

export default function WebRTC(roomID) {
  const [clients, setClients] = useStateWithCallBack([]);

  const addNewClient = useCallback(
    (newClient, cb) => {
      setClients((list) => {
        if (!list.includes(newClient)) {
          return [...list, newClient];
        }

        return list;
      }, cb);
    },
    [setClients]
  );

  const peerConnections = useRef({});
  const localMediaStream = useRef(null);
  const peerMediaElements = useRef({ [LOCAL_VIDEO]: null });

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
        } else {
          // FIX LONG RENDER IN CASE OF MANY CLIENTS
          let settled = false;
          const interval = setInterval(() => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
              settled = true;
            }

            if (settled) {
              clearInterval(interval);
            }
          }, 1000);
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
  }, [addNewClient]);

  useEffect(() => {
    async function setRemoteMedia({
      peerID,
      sessionDescription: remoteDescription,
    }) {
      await peerConnections.current[peerID]?.setRemoteDescription(
        new RTCSessionDescription(remoteDescription)
      );

      if (remoteDescription.type === "offer") {
        const answer = await peerConnections.current[peerID].createAnswer();

        await peerConnections.current[peerID].setLocalDescription(answer);

        socket.emit("relay-sdp", {
          peerID,
          sessionDescription: answer,
        });
      }
    }

    socket.on("session-description", setRemoteMedia);

    return () => {
      socket.off("session-description");
    };
  }, []);

  useEffect(() => {
    socket.on("ice-candidate", ({ peerID, iceCandidate }) => {
      peerConnections.current[peerID]?.addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    });

    return () => {
      socket.off("ice-candidate");
    };
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

    return () => {
      socket.off("remove-peer");
    };
  }, [setClients]);

  useEffect(() => {
    async function startCapture() {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
        },
      });

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

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
  }, [roomID, addNewClient]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  return { clients, provideMediaRef };
}
