import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className={"main-nav container"}>
      <NavLink to="/" className={"main-nav__logo"}>
        BodhiCentral.com
      </NavLink>
      <ul>
        <li className={"main-nav__item"}>
          <NavLink
            className={"sub-heading"}
            activeClassName="active"
            to="/admin/post"
          >
            Admin Posts
          </NavLink>
        </li>
        <li className={"main-nav__item"}>
          <NavLink
            className={"sub-heading"}
            activeClassName="active"
            to="/practices"
          >
            Your Practices
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
