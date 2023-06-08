import { useParams } from "react-router-dom";
import styles from "./webRoom.module.scss";
import useWebRTC from "../../hooks/useWebRTC";

const WebRoom = () => {
  const { id: roomID } = useParams();
  const {clients, provideMediaRef} = useWebRTC(roomID);

  console.log(clients);
  return <div className={styles.webRoom}>
    {clients.map(clientId=>{
        return(
            <div key={clientId}>
                <video
                ref={instance =>{
                    provideMediaRef(clientId, instance)
                }}
                autoPlay
                playsInline
                muted={clientId === "LOCAL_VIDEO"} 
                src="" />
            </div>
        )
    })}
  </div>;
};

export default WebRoom;
