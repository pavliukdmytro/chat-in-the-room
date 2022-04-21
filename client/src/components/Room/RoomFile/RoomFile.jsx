import { useSelector } from 'react-redux';
import moment from 'moment';
import './RoomFile.scss';

const RoomFile = ({ result }) => {
  const userId = useSelector(({ authData }) => authData?.user?.id);
  const isCurrentUser = () => {
    return userId === result?.author?._id;
  }

  const formatDate = (time) => {
    return moment(time).calendar();
  }

  return(
    <span className={ `room-file ${ isCurrentUser() && 'room-file_right' }` }>
      <span className="room-file__name">{ result.author?.name }</span>
      <img
        src={ result.author.photo.src }
        alt={ result.author.photo.alt }
        className="room-file__image"
      />
      <a
        className="room-file__file"
        href={ result.file.path }
        download
      >
        {
          result.file.mime.match(/image/) &&
          <img
            src={ result.file.path }
            alt={ result.file.name }
            className="room-file__content-image"
          />
        }
        { result.file.name }
      </a>
      <span className="room-file__date">
        { formatDate( result.date ) }
      </span>
    </span>
  )
}

export default RoomFile;