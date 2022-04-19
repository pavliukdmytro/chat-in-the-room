import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "@store/slices/room";

import RoomUsers from "@/Room/RoomUsers/RoomUsers";

const Room = () => {
  const { roomId }  = useParams();
  const dispatch = useDispatch();

  const socket = io('', {
    query: `roomId=${ roomId }`,
  });

  const sendData = (data) => {
    dispatch( setData( data ) );
  }

  useEffect(() => {
    socket.on('SOCKET:SEND_DATA', sendData);
    return () => {
      socket.off('SOCKET:SEND_DATA', sendData);
      socket.disconnect();
    };
  }, []);

  return(
    <div className="row">
      <div className="col-md-4">
        <RoomUsers />
      </div>
      <div className="col-md-8">

      </div>
    </div>
  )
}

export default Room;