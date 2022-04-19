import { Link } from "react-router-dom";

import './NotFound.scss';

const NotFound = () => {
  return(
    <div className="container text-center">
      <div className="not-found">
        <h1>Not found</h1>
        <h2 className="fs-1">404</h2>
        <Link to="/" className="btn btn-secondary">Go to main page</Link>
      </div>
    </div>
  )
}

export default NotFound;