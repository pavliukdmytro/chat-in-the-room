import {useEffect, useState} from "react";
import axios from "axios";

const SignIn = () => {
  const [error, setError] = useState('');

  const handlerValidate = (event, form) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { data, status } = await axios.post('sign-in', formData);

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
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            pattern="^[\w ]{6,16}$"
            required
          />
        </div>
        { error && <p className="text-danger">{ error }</p> }
        <button
          type="submit"
          className="btn btn-primary w-100 d-flex m-auto justify-content-center"
        >
          sign in
        </button>
      </form>
    </div>
  )
}

export default SignIn;