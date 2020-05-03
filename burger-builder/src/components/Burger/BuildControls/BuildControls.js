import React, { Component } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

class BuildControls extends Component {
  controls = [
    {
      label: "Salad",
      type: "salad",
      price: 2.5
    },
    {
      label: "Meat",
      type: "meat",
      price: 3
    },
    {
      label: "Cheese",
      type: "cheese",
      price: 1.5
    },
    {
      label: "Bacon",
      type: "bacon",
      price: 3
    }
  ];
  render() {
    return (
      <div className={classes.BuildControls}>
        <p>Total Price: ${this.props.price}</p>
        {this.controls.map((aControl, key) => (
          <BuildControl
            label={aControl.label}
            key={aControl.label}
            type={aControl.type}
            added={this.props.added}
            removed={this.props.removed}
            price={aControl.price}
            disabled={this.props.disabled[aControl.type]}
          />
        ))}
        <button
          className={classes.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.ordered}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}
export default BuildControls;
