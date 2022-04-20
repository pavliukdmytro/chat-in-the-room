import { useSelector } from 'react-redux';
import MainCreateRoom from "@/Main/MainCreateRoom/MainCreateRoom";
import MainRooms from "@/Main/MainRooms/MainRooms";

const Main = () => {
  const user = useSelector(({ authData }) => authData.user);

  return(
    <div>
      <MainRooms />
      { user && <MainCreateRoom /> }
    </div>
  )
}

export default Main;