import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.More}
        onClick={() => props.added(props.type, props.price)}
      >
        More
      </button>
      <button
        className={classes.Less}
        onClick={() => props.removed(props.type, props.price)}
        disabled={props.disabled}
      >
        Less
      </button>
    </div>
  );
};

export default buildControl;
