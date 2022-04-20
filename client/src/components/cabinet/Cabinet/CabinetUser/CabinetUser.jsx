import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { setData } from '@store/slices/authData';

const CabinetUser = () => {
  const user = useSelector(store => store.authData.user);
  const [ userInfo, setUserInfo ] = useState(user);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerChangeUserProps = (prop, value) => {
    setUserInfo({
      ...userInfo,
      [ prop ]: value,
    })
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { data } = await axios.put('/auth', formData);

    if (!data.ok && data.error) {
      setError(data.error);
    } else {
      navigate('/sign-in');
      dispatch( setData(null) );
    }
  }

  const handlerValidate = (event, form) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  };

  const handlerValidatePassword = (e) => {
    if (password !== confirmPassword) {
      setError('new password does not match');
      e.preventDefault();
    }
  };

  const handlerRemove = async () => {
    const { data } = await axios.delete('/auth');

    if (data.ok) {
      navigate('/');
      dispatch( setData( null ) );
    } else {
      console.log(data);
    }
  }

  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation');

    // console.log(location);

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', event => handlerValidate(event, form), false);
      });

    return () => {
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.removeEventListener('submit', event => handlerValidate(event, form), false);
        });
    }
  }, []);

  return(
    <div className="col-md-6 offset-md-3">
      <form
        className="m-auto mt-5 mb-5 needs-validation"
        noValidate
        onSubmit={ handlerSubmit }
      >
        <div className="form-group mb-4">
          <label htmlFor="name">Change user name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Name"
            value={ userInfo.name }
            onInput={({ target }) => handlerChangeUserProps('name', target.value) }
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleFormControlFile1">Change photo</label><br/>
          <input
            type="file"
            name="photo"
            className="form-control-file mw-100"
            id="exampleFormControlFile1"
          />
        </div>
        {
          isChangePassword &&
          <div className="form-group mb-4">
            <label htmlFor="exampleInputPassword1">Old password</label>
            <input
              type="password"
              name="oldPassword"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              pattern="^[\w ]{6,16}$"
              // value={ password }
              // onInput={({ target }) => setPassword(target.value)}
            />
          </div>
        }

        {
          isChangePassword &&
          <div className="form-group mb-4">
            <label htmlFor="exampleInputPassword1">New password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              pattern="^[\w ]{6,16}$"
              value={ password }
              onInput={({ target }) => setPassword(target.value)}
            />
          </div>
        }

        {
          isChangePassword &&
          <div className="form-group mb-4">
            <label htmlFor="password-confirm">Confirm new password</label>
            <input
              type="password"
              name="confirmNewPassword"
              className="form-control"
              id="password-confirm"
              placeholder="Password"
              required
              pattern="^[\w ]{6,16}$"
              value={ confirmPassword }
              onInput={({ target }) => setConfirmPassword(target.value)}
            />
          </div>
        }

        {
          !isChangePassword &&
          <div className="mb-4 d-flex justify-content-between">
            <button className="btn btn-dark" onClick={ () => setIsChangePassword( true ) }>
              change password
            </button>
            <button type="button" className="btn btn-danger" onClick={ handlerRemove }>
              remove user
            </button>
          </div>
        }


        { error && <p className="text-danger">{ error }</p> }
        <button
          type="submit"
          className="btn btn-primary w-100 d-flex m-auto justify-content-center"
          onClick={ handlerValidatePassword }
        >
          save
        </button>
      </form>
    </div>
  )
}

export default CabinetUser;