import React from 'react';
import './Main.scss';
import PrivateRoute from "../common/PrivateRoute/PrivateRoute";
import Posts from "./Posts/Posts";
import Navbar from "./Navbar/Navbar";
import Post from "./Post/Post";

function Main () {
  return (
    <div>
      <Navbar/>
      <PrivateRoute exact path="/" component={ Posts } />
      <PrivateRoute path="/post/:id" component={ Post } />
    </div>
  );
}

export default Main;
