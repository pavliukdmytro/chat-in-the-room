import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Room = () => {
  const { roomId }  = useParams();
  const socket = io();

  console.log(roomId);
  return(
    <div>
      Room
    </div>
  )
}

export default Room;