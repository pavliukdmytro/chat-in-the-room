import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { removeUser } from '@store/slices/authData';
import '@/Cabinet/UserInfo/UserInfo.scss';

const UserInfo = () => {
  const authData = useSelector(store => store?.authData?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    const { data } = await axios.post('/logout');

    if (data.ok) {
      navigate('/');
      dispatch( removeUser() );
    }
  }

  return(
    <div className="d-flex align-items-center justify-content-end">
      <div className="user-photo">

      </div>
      <div className="mx-2">
        Hello, <b>{ authData.name }</b>
      </div>
      <button
        type="button"
        className="btn btn-dark mr-3"
        onClick={ logOut }
      >log out</button>
    </div>
  )
}

export default UserInfo;