import { Link } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar__header">Password tool</h1>
      <Link className="navbar__link" to="/">
        Practice
      </Link>
      <Link className="navbar__link" to="/generate">
        Generate
      </Link>
    </div>
  );
}
