import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Posts from "../../containers/Blog/Posts/Posts";

import "./Blog.css";
import asyncComponent from "../../hoc/asyncComponent";

import FullPost from "../../containers/Blog/FullPost/FullPost";

const asyncNewPost = asyncComponent(() => {
  return import("../../containers/Blog/NewPost/NewPost");
});

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" exact component={asyncNewPost} />
          <Route path="/:postId" exact component={FullPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
