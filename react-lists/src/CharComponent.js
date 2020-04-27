import React from "react";
import "./CharComponent.css";

const charComponent = props => {
  return (
    <div className="Char" onClick={props.click}>
      <p>{props.input}</p>
    </div>
  );
};

export default charComponent;
