const SignIn = () => {
  return(
    <div className="col-md-6 offset-md-3">
      <form className="m-auto mt-5 mb-5 needs-validation" noValidate>
        <div className="form-group mb-4">
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
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>
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