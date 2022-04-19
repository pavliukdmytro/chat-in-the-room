import { useState } from "react";
import { useParams } from "react-router-dom";
import './RoomInput.scss';

const RoomInput = () => {
  const { roomId } = useParams();
  const [ message, setMessage ] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    const socket = require('@src/socket').default(roomId);

    socket.emit('CHAT:MESSAGE', {
      date: Date.now(),
      message,
    });
    setMessage('');
  }

  return(
    <form onSubmit={ handlerSubmit } className="room-input">
      <textarea
        name="message"
        cols="30"
        rows="2"
        className="w-100 p-3"
        onInput={ ({ target }) => setMessage(target.value) }
        value={ message }
      />
      <button type="submit" className="btn btn-success w-100 mt-3">
        submit
      </button>
    </form>
  )
}

export default RoomInput;