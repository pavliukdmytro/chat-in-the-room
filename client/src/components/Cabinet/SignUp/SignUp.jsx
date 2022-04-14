import { useEffect } from "react";

const SignUp = () => {

  const handlerSubmit = (event, form) => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }

  useEffect(() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', event => handlerSubmit(event, form), false);
        });

      return () => {
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.removeEventListener('submit', event => handlerSubmit(event, form), false);
          });
      }
  }, []);

  return(
    <form className="mw-50 m-auto mt-5 mb-5 needs-validation" noValidate>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputEmail1 mb-2">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
          {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputEmail1">User name</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleFormControlFile1">Choice photo</label><br/>
        <input
          type="file"
          className="form-control-file mw-100"
          id="exampleFormControlFile1"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 d-flex m-auto justify-content-center">register</button>
    </form>
  )
}

export default SignUp;