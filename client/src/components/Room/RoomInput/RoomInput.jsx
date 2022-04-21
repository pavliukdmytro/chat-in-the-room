import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SocketIOFileClient from 'socket.io-file-client';
import './RoomInput.scss';

const RoomInput = () => {
  const { roomId } = useParams();
  const [ message, setMessage ] = useState('');
  const inputFile = useRef();

  const handlerSubmit = (e) => {
    e.preventDefault();
    const socket = require('@src/socket').default(roomId);
    const uploader = new SocketIOFileClient(socket, {
      data: {
        date: Date.now(),
      }
    });
    uploader.chunkSize = 1024 * 5; // 5 kb

    uploader.upload(inputFile.current, {
      data: {
        date: Date.now(),
      }
    });
    if (message) {
      socket.emit('CHAT:MESSAGE', {
        date: Date.now(),
        message,
      });
      setMessage('');
    }
  }

  return(
    <form onSubmit={ handlerSubmit } className="room-input">
      <textarea
        name="message"
        cols="30"
        rows="2"
        className="w-100 p-3 mb-3"
        onInput={ ({ target }) => setMessage(target.value) }
        value={ message }
      />
      <input
        type="file"
        className="mb-3"
        ref={ inputFile }
      />
      <button type="submit" className="btn btn-success w-100">
        submit
      </button>
    </form>
  )
}

export default RoomInput;