import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header>
      <Link to="/contact">Contact</Link>
      <Link to="/">
        <img src={logo} alt="Logo contains fire icon" className="logo" />
      </Link>
      <Link to="/menu">Menu</Link>
    </header>
  );
}
