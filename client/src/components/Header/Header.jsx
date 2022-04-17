import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import Entry from "./Entry/Entry";

const Header = () => {
  return(
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Logo />
      <Menu />
      <Entry />
    </header>
  )
}

export default Header;