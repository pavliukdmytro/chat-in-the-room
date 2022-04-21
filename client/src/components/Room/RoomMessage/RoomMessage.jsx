import { useSelector } from 'react-redux';
import moment from 'moment';
import './RoomMessage.scss';

const RoomMessage = ({ result }) => {
  const userId = useSelector(({ authData }) => authData?.user?.id);
  const isCurrentUser = () => {
    return userId === result?.author?._id;
  }

  const formatDate = (time) => {
    return moment(time).calendar();
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
        { formatDate( result.date ) }
      </div>
    </div>
  )
}

export default RoomMessage;