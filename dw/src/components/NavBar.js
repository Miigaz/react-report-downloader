import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav className="navbar is-link mb-5">
      <div className="navbar-start">
        <Link className="navbar-item ml-5"  to="/main">Нүүр</Link>
        <a className="navbar-item" onClick={props.onLogout}>Гарах</a>
      </div>
    </nav>
  );
}
