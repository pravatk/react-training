import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

const navItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <NavItem link="/">Burger Builder</NavItem>
      <NavItem link="/checkout">Check Out</NavItem>
      <NavItem link="/orders">Orders</NavItem>
    </ul>
  );
};

export default navItems;
