import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './MainRooms.scss';

const MainRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/rooms');

      if (data.ok) {
        setRooms(data.rooms);
      }

      console.log(data);
    }
    getData();
  },[]);

  return(
    <div className="main-rooms">
      <div className="row mb-5 mt-3">
        <div className="col-md-6 offset-md-3 d-flex flex-column">
          <h1>Rooms</h1>
          <div className="card">
            <ul className="list-group list-group-flush">
              {
                rooms.map(el => (
                  <li key={ el.roomId } className="list-group-item">
                    <Link
                      to={ `room/${ el.roomId }` }
                      className="text-secondary text"
                    >
                      { el.roomId } ({ el?.users?.length })
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainRooms;