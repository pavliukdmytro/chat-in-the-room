import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainCreateRoom = () => {
  const [roomId, setRoomId] = useState('0000');
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const handlerKeyDown = () => {
    if (roomId.length == 4) {
      setRoomId(roomId.slice(1, roomId.length));
    }
  }

  const handlerInput = ({ target: { value } }) => {
    setRoomId(value);
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { data } = await axios.post('/rooms', formData);

    if (data.ok) {
      navigate(`/room/${ data.roomId }`);
    } else if (data.error) {
      setError(data.error);
    }
  }

  return(
    <form className="row mb-5" onSubmit={ handlerSubmit }>
      <div className="col-md-6 offset-md-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="text-center w-100 mb-3">Create or enter in a new room</label>
          <div className="d-flex">
            <input
              type="number"
              name="roomId"
              className="form-control" id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={ roomId }
              onKeyDown={ handlerKeyDown }
              onInput={ handlerInput  }
            />
            <button type="submit" className="btn btn-success w-25 ms-3">
              enter
            </button>
          </div>
          {
            error &&
            <p className="text-danger">{ error }</p>
          }
        </div>
      </div>
    </form>
  )
};

export default MainCreateRoom;