import { useSelector } from "react-redux";
import './RoomUsers.scss';

const RoomUsers = () => {
  const users = useSelector(state => state?.room?.data?.users);

  return(
    <ul className="room-users">
      {
        Array.isArray(users) &&
        users.map(el => (
          <li
            key={ el._id }
            className="room-users-item"
          >
            <span className="room-users-item__icon">
              <img
                src={ el.photo.src }
                alt={ el.photo.alt }
                className="room-users-item__image"
              />
            </span>
            { el.name }
          </li>
        ))
      }
    </ul>
  )
}

export default RoomUsers;