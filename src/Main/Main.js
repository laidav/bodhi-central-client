import React from 'react';
import './Main.scss';
import { Link } from "react-router-dom";

import Dukkhas from "./Dukkhas/Dukkas"

function Main ({match}) {
  return (
    <div>
      <Link to="/dukkhas">Dukkhas</Link>
      <Route path={`${match.path}/dukkhas`} component={Dukkhas}/>
    </div>
  );
}

export default Main;
