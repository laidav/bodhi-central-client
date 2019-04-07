import React from 'react';
import './Main.scss';
import PrivateRoute from "../common/PrivateRoute/PrivateRoute";
import Posts from "./Posts/Posts";
import Navbar from "./Navbar/Navbar";
import Post from "./Post/Post";

function Main () {
  return (
    <div className={ "main" }>
      <div className={ "main__nav" }>
        <Navbar />
      </div>
      <main className={ "main__content"}>
        <PrivateRoute exact path="/" component={ Posts } />
        <PrivateRoute path="/post/:id" component={ Post } />
      </main>
    </div>
  );
}

export default Main;
