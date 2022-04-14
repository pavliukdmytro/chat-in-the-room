import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      Main
    </Link>
    // <a href="/" >
    //   {/*<svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">*/}
    //   {/*  <use xlink:href="#bootstrap"></use>*/}
    //   {/*</svg>*/}
    // </a>
  )
}

export default Logo;