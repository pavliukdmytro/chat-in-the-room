import { Link } from 'react-router-dom'

const Entry = () => {
  return(
    <div className="col-md-3 text-end">
      <Link to="Sign-in" className="btn btn-outline-primary me-2">Sign in</Link>
      <Link to="Sign-up" className="btn btn-primary">Sign up</Link>
    </div>
  )
}

export default Entry;