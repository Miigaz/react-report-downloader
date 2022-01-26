import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav>
      <div className="navbar-start">
        <Link className="navbar-item"  to="/main">Нүүр</Link>
        <a className="navbar-item" onClick={props.onLogout}>Гарах</a>
      </div>
    </nav>
  );
}
