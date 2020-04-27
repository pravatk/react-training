import React from "react";

const validationComponent = props => {
  let output = (
    <div>
      <p>Text too short</p>
    </div>
  );

  if (props && props.length > 5) {
    output = (
      <div>
        <p>Text Long Enough</p>
      </div>
    );
  }
  return output;
};

export default validationComponent;
