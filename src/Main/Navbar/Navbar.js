import React from 'react';
import './Navbar.scss';
import { NavLink } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <ul>
        <li><NavLink activeClassName="active" to="/home">Home</NavLink></li>
      </ul>
      <ul>
        <li><NavLink activeClassName="active" to="/dukkhas">Dukkhas</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
