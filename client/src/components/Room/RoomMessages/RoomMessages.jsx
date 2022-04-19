import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import RoomMessage from "@/Room/RoomMessage/RoomMessage.jsx";
import './RoomMessages.scss';

const RoomMessages = () => {
  const messages = useSelector(({ room }) => room.data.messages);
  const rootEl = useRef();

  useEffect(() => {
    const { current: target } = rootEl;
    target.scrollTop = target.scrollHeight;
  }, [ messages ]);

  return(
    <div className="room-messages" ref={ rootEl }>
      {
        messages &&
        messages.map(el => (
          <RoomMessage result={ el } key={el._id} />
        ))
      }
    </div>
  )
}

export default RoomMessages;