import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidMount() {
    console.log(`[OrderSummary] componentDidMount`);
  }
  componentDidUpdate() {
    console.log(`[OrderSummary] componentDidUpdate`);
  }
  render() {
    const ingredients = this.props.ingredients;
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
          <strong>Total Price: ${this.props.price}</strong>
        </p>
        <p>Continue to check-out</p>

        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
