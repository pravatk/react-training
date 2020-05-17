import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputEl = null;
  console.log(props);
  switch (props.type) {
    case "input":
      inputEl = (
        <input
          className={classes.InputElement}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputEl = (
        <textarea
          className={classes.InputElement}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select": {
      inputEl = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.config.options.map((k) => (
            <option key={k.value} value={k.value}>
              {k.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    }
    default:
      inputEl = (
        <input
          className={classes.InputElement}
          {...props.config}
          value={props.value}
        />
      );
  }
  let validationError = null;
  if (!props.valid && props.touched) {
    validationError = (
      <p style={{ color: "red", margin: "2px" }}>
        Invalid value for {props.name}
      </p>
    );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
      {validationError}
    </div>
  );
};

export default input;
