import { useSelector } from "react-redux";
import './RoomUsers.scss';

const RoomUsers = () => {
  const users = useSelector(state => state?.room?.data?.users);

  return(
    <ul className="list-group list-group-flush">
      {
        Array.isArray(users) &&
        users.map(el => (
          <li
            key={ el.id }
            className="list-group-item d-flex justify-content-end align-items-end"
          >
            <span className="overflow-hidden rounded-circle">
              <img
                src={ el.photo.src }
                alt={ el.photo.alt }
                className="w-25"
              />
            </span>
            <p>
              <b>{ el.name }</b>
            </p>
          </li>
        ))
      }
    </ul>
  )
}

export default RoomUsers;