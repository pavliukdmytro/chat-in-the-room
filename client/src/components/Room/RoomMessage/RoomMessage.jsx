import { useSelector } from 'react-redux';
import './RoomMessage.scss';

const RoomMessage = ({ result }) => {
  const userId = useSelector(({ authData }) => authData.user.id);
  const isCurrentUser = () => {
    return userId === result.author._id;
  }

  return(
    <div className={ `room-message ${ isCurrentUser() && 'room-message_right' }`}>
      <p className="room-message__name">{ result.author.name }</p>
      <img
        src={ result.author.photo.src }
        alt={ result.author.photo.alt }
        className="room-message__image"
      />
      <p className="room-message__message">{ result.message }</p>
      <div className="room-message__date">
        { result.date }
      </div>
    </div>
  )
}

export default RoomMessage;