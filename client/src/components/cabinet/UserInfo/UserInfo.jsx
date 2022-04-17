import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { removeUser } from '@store/slices/authData';
import '@/cabinet/UserInfo/UserInfo.scss';

import DefImg from "@/def/DefImg/DefImg";

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
      <Link to="/cabinet" className="user-info">
        <span className="user-info__photo">
          { authData?.photo && <DefImg result={ authData?.photo } /> }
        </span>
        <span className="user-info__name">
          Hello, <b>{ authData.name }</b>
        </span>
      </Link>
      <button
        type="button"
        className="btn btn-dark mr-3"
        onClick={ logOut }
      >log out</button>
    </div>
  )
}

export default UserInfo;