import { useEffect, useState } from "react";
import axios from "axios";

import './SignUp.scss';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlerValidate = (event, form) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  };
  const handlerValidatePassword = (e) => {
      if (password !== confirmPassword) {
        setError('password does not match');
        e.preventDefault();
      }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { data, status } = await axios.post('sign-up', formData);

    if (!data.ok && data.error) {
      setError(data.error);
    }

    console.log(status, data);
  }

  useEffect(() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.querySelectorAll('.needs-validation')

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
          <label htmlFor="exampleInputEmail1 mb-2">Email address</label>
          <input
            type="email"
            name="username"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1">User name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleFormControlFile1">Choice photo</label><br/>
          <input
            type="file"
            name="photo"
            className="form-control-file mw-100"
            id="exampleFormControlFile1"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="text"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            pattern="^[\w ]{6,16}$"
            value={ password }
            onInput={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="text"
            name="confirmPassword"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            pattern="^[\w ]{6,16}$"
            value={ confirmPassword }
            onInput={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        { error && <p className="text-danger">{ error }</p> }
        <button
          type="submit"
          className="btn btn-primary w-100 d-flex m-auto justify-content-center"
          onClick={ handlerValidatePassword }
        >
          register
        </button>
      </form>
    </div>
  )
}

export default SignUp;