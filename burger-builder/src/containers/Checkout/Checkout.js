import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    return this.props.ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => <ContactData {...props} />}
        />
      </div>
    ) : (
      summary
    );
  }
}

const mapPropsToStates = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
  };
};

export default connect(mapPropsToStates)(Checkout);
