import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios.order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErorHandling from "../../hoc/withErrorHandling/withErrorHandling";

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
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
    this.setState({ loading: true });
    axios
      .post("/orders.json", {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: "Pravat",
          email: "someone@test.com",
          address: {
            pin: 73779,
            city: "Bangalore"
          }
        }
      })
      .then(
        response => {
          console.log(response.data);
          this.setState({
            loading: false,
            purchasing: false
          });
        },
        error => {
          console.log(error);
          this.setState({
            loading: false,
            purchasing: false
          });
        }
      );
  };

  componentDidMount() {
    axios.get("/ingredients.json").then(
      response => {
        this.setState({ ingredients: response.data, loading: false });
      },
      error => {
        console.log(`[BurgerBuilder] error: ${error}`);
      }
    );
  }

  render() {
    const disableIngredients = { ...this.state.ingredients };
    for (let key in disableIngredients) {
      disableIngredients[key] = disableIngredients[key] <= 0;
    }

    let modalContent = null;
    let burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
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

    if (this.state.ingredients)
      modalContent = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={() => this.purchaseHandler(false)}
          price={this.state.totalPrice}
        />
      );

    if (!this.state.ingredients) {
      burger = <Spinner />;
    }
    if (this.state.loading) {
      modalContent = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseHandler(false)}
        >
          {modalContent}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErorHandling(BurgerBuilder, axios);
