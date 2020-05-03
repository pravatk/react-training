import React from "react";

import NavItems from "../NavItems/NavItems";
import Logo from "../../UI/Logo/Logo";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

import Aux from "../../../hoc/Aux";

const sideDrawer = props => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div
        className={[
          classes.SideDrawer,
          props.show ? classes.Open : classes.Close
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
