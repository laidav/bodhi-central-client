import React from "react";
import "./Main.scss";
import PrivateRoute from "common/PrivateRoute/PrivateRoute";
import Posts from "Main/Posts/Posts";
import Navbar from "Main/Navbar/Navbar";
import Post from "Main/Post/Post";
import AdminPosts from "Main/Admin/AdminPosts/AdminPosts";
import AdminPostForm from "Main/Admin/AdminPostForm/AdminPostForm";
import PracticeExplorer from "Main/PracticeExplorer/PracticeExplorer";
import { Switch } from "react-router-dom";

function Main() {
  return (
    <div className={"main"}>
      <div className={"main__nav"}>
        <Navbar />
      </div>
      <main className={"main__content container"}>
        <PrivateRoute exact path={"/"} component={Posts} />
        <PrivateRoute path={"/post/:id"} component={Post} />
        <PrivateRoute exact path={"/admin/post"} component={AdminPosts} />
        <PrivateRoute path={"/practices"} component={PracticeExplorer} />
        <Switch>
          <PrivateRoute path={"/admin/post/add"} component={AdminPostForm} />
          <PrivateRoute path={"/admin/post/:id"} component={AdminPostForm} />
        </Switch>
      </main>
    </div>
  );
}

export default Main;
