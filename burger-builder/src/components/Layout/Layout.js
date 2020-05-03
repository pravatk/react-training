import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideBar/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClickHandler = val => {
    this.setState({
      showSideDrawer: val
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          height="80%"
          clicked={() =>
            this.sideDrawerClickHandler(!this.state.showSideDrawer)
          }
        />

        <SideDrawer
          closed={() => this.sideDrawerClickHandler(!this.state.showSideDrawer)}
          show={this.state.showSideDrawer}
        />

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
