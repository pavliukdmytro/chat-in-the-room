import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "@store/slices/room";
import { useParams } from "react-router-dom";

import RoomUsers from "@/Room/RoomUsers/RoomUsers";
import RoomChat from "@/Room/RoomChat/RoomChat";

const Room = () => {
  const [ isLoad, setIsLoad ] = useState(false);
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const sendData = (data) => {
    dispatch( setData( data ) );
    if (!isLoad) {
      setIsLoad(true);
    }
  }


  useEffect(() => {
    const socket = require('@src/socket').default(roomId);

    socket.on('CHAT:SEND_DATA', sendData);

    return () => {
      socket.off('CHAT:SEND_DATA', sendData);
      socket.disconnect();
    };
  }, []);

  return(
    <div>
      {
        isLoad ?
          <div className="row">
            <div className="col-md-4">
              <RoomUsers />
            </div>
            <div className="col-md-8">
              <RoomChat />
            </div>
          </div> :
          <div>Loading...</div>
      }
    </div>
  )
}

export default Room;