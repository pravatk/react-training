import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  console.log(props);
  const ingredients = Object.keys(props.orderDetails.ingredients).map((key) => (
    <span
      key={key}
      style={{
        display: "inline-block",
        margin: "0px 5px",
        padding: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        boxShadow: "0 2px 2px #ccc",
      }}
    >
      {key} {`(${props.orderDetails.ingredients[key]})`}
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Total Price:{" "}
        <strong>{`$${Number.parseFloat(props.orderDetails.price).toFixed(
          2
        )}`}</strong>
      </p>
    </div>
  );
};

export default order;
