import React from "react";

const userInput = props => {
  return (
    <div>
      <input onChange={props.changes} />
    </div>
  );
};

export default userInput;
