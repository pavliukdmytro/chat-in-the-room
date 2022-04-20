import { useSelector } from 'react-redux';
import RoomMessages from '@/Room/RoomMessages/RoomMessages.jsx';
import RoomInput from '@/Room/RoomInput/RoomInput.jsx';

const RoomChat = () => {
  const user = useSelector(({ authData }) => authData.user);

  return(
    <div>
      <RoomMessages />
      { user && <RoomInput /> }
    </div>
  )
}

export default RoomChat;