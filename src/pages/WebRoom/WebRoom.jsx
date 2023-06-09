import { useParams } from "react-router-dom";
import styles from "./webRoom.module.scss";
import useWebRTC from "../../hooks/useWebRTC";

function layout(clientsNumber = 1) {
  const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '90%',
        height,
      }];
    }

    return row.map(() => ({
      width: '45%',
      height,
    }));
  }).flat();
}

const WebRoom = () => {
  const { id } = useParams();
  const { clients, provideMediaRef } = useWebRTC(id);
  const videoLayout = layout(clients.length);

  return (
    <div className={styles.webRoom}>
      {clients.map((clientId, index) => {
        return (
          <div key={clientId} style={videoLayout[index]}>
            <video
              ref={(instance) => {
                provideMediaRef(clientId, instance);
              }}
              autoPlay
              playsInline
              muted={clientId === "LOCAL_VIDEO"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WebRoom;
