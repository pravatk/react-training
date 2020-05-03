import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  addedListener = (type, price) => {
    const newState = Object.assign({}, this.state);
    newState.ingredients[type] += 1;
    newState.totalPrice += price;
    this.setState(newState);
    this.updatePurchasable(newState);
  };

  removedListener = (type, price) => {
    const newState = Object.assign({}, this.state);
    if (newState.ingredients[type] <= 0) return;
    newState.ingredients[type] -= 1;
    newState.totalPrice -= price;
    this.setState(newState);
    this.updatePurchasable(newState);
  };

  updatePurchasable = newState => {
    const ingredients = newState.ingredients;
    const canPurchase =
      Object.keys(ingredients)
        .map(key => ingredients[key])
        .reduce((sum, el) => sum + el, 0) > 0;
    console.log(`Can Purchase: ${canPurchase}`);
    this.setState({
      purchasable: canPurchase
    });
  };

  purchaseHandler = (value = true) => {
    this.setState({ purchasing: value });
  };

  purchaseContinueHandler = () => {
    alert("Order Placed Successfully!!");
    this.purchaseHandler(false);
  };

  render() {
    const disableIngredients = { ...this.state.ingredients };
    for (let key in disableIngredients) {
      disableIngredients[key] = disableIngredients[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        {/* {this.state.purchasing ? (
          <Modal>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
        ) : null} */}
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseHandler(false)}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={() => this.purchaseHandler(false)}
            price={this.state.totalPrice}
          />
        </Modal>

        <BuildControls
          added={this.addedListener}
          removed={this.removedListener}
          disabled={disableIngredients}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
