import { Link } from 'react-router-dom'

const Entry = () => {
  return(
    <div className="col-md-3 text-end">
      <Link to="sign-in" className="btn btn-outline-primary me-2">Sign in</Link>
      <Link to="sign-up" className="btn btn-primary">Sign up</Link>
    </div>
  )
}

export default Entry;