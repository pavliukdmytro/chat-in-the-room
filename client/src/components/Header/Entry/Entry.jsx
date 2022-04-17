import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuth } from '@store/slices/authData';

import UserInfo from '@/cabinet/UserInfo/UserInfo';

const Entry = () => {
  const authData = useSelector(store => store.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authData?.isLoad) {
      dispatch( fetchAuth() );
    }
  }, []);


  return(
    <div className="col-md-3 text-end">

      { authData?.user && <UserInfo /> }

      {
        !authData?.user &&
        authData?.isLoad &&
        <Link to="sign-in" className="btn btn-outline-primary me-2">Sign in</Link>
      }
      {
        !authData?.user &&
        authData?.isLoad &&
        <Link to="sign-up" className="btn btn-primary">Sign up</Link>
      }
    </div>
  )
}

export default Entry;