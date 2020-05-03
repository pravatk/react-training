import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredients = props.ingredients;
  return (
    <Aux>
      <h3>You Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {Object.keys(ingredients).map((key, index) => (
          <li key={key}>
            <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
            {ingredients[key]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Price: ${props.price}</strong>
      </p>
      <p>Continue to check-out</p>

      <Button btnType="Danger" clicked={props.purchaseCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
