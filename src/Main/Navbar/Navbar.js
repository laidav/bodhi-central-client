import React from 'react';
import './Navbar.scss';
import { NavLink } from "react-router-dom";

function Navbar ({ className }) {
  return (
    <nav className={ className }>
      <ul>
        <li><NavLink activeClassName="active" to="/">Home</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
