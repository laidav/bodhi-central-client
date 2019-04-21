import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className={"main-nav"}>
      <NavLink to="/" className={"main-nav__logo"}>
        BodhiCentral.com
      </NavLink>
      <ul>
        <li className={"main-nav__item"}>
          <NavLink activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className={"main-nav__item"}>
          <NavLink activeClassName="active" to="/admin/post">
            Admin Posts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
