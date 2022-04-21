import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setData } from "@store/slices/room";
import { useParams } from "react-router-dom";

import RoomUsers from "@/Room/RoomUsers/RoomUsers";
import RoomChat from "@/Room/RoomChat/RoomChat";

const Room = () => {
  const [ isLoad, setIsLoad ] = useState(false);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const socket = require('@src/socket').default(roomId);
  const navigate = useNavigate();

  const id = useSelector(({ authData }) => authData?.user?.id);
  const owner = useSelector(({ room }) => room?.data?.owner);

  const sendData = (data) => {
    dispatch( setData( data ) );
    if (!isLoad) {
      setIsLoad(true);
    }
  }

  const handlerRemovedRRoom = () => {
    navigate('/');
  }

  const handlerRemoveRoom = () => {
    socket.emit('CHAT:REMOVE_ROOM', {
      roomId,
    });
  }


  useEffect(() => {
    socket.on('CHAT:SEND_DATA', sendData);
    socket.on('CHAT:ROOM_REMOVED', handlerRemovedRRoom);

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
              {
                id === owner &&
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ handlerRemoveRoom }
                  >
                    remove room
                  </button>
                  <br/>
                  <br/>
                </div>
              }
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