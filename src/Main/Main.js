import React from 'react';
import './Main.scss';
import PrivateRoute from "../common/PrivateRoute/PrivateRoute";
import Posts from "./Posts/Posts";
import Navbar from "./Navbar/Navbar";
import Post from "./Post/Post";
import AdminPosts from "./Admin/AdminPosts/AdminPosts";
import AdminPostForm from "./Admin/AdminPostForm/AdminPostForm";
import { Switch } from "react-router-dom";

function Main () {
  return (
    <div className={ "main" }>
      <div className={ "main__nav" }>
        <Navbar />
      </div>
      <main className={ "main__content"}>
        <PrivateRoute exact path={ "/" } component={ Posts } />
        <PrivateRoute path={ "/post/:id" } component={ Post } />
        <PrivateRoute exact path={ "/admin/post" } component={ AdminPosts } />
        <Switch>
          <PrivateRoute path={ "/admin/post/add" } component={ AdminPostForm } />
          <PrivateRoute path={ "/admin/post/:id" } component={ AdminPostForm } />
        </Switch>
      </main>
    </div>
  );
}

export default Main;
