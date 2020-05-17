import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  checkoutCancelledHandler = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    console.log(this.props);
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    console.log(params);
    params.forEach((val, key) => {
      if (key !== "totalPrice") ingredients[key] = val;
    });
    console.log(ingredients);
    this.setState({
      ingredients: ingredients,
      totalPrice: params.get("totalPrice"),
    });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
