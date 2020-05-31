import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios.order";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  /*
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
*/
  updatePurchasable = (newState) => {
    const ingredients = newState.ingredients;
    const canPurchase =
      Object.keys(ingredients)
        .map((key) => ingredients[key])
        .reduce((sum, el) => sum + el, 0) > 0;
    console.log(`Can Purchase: ${canPurchase}`);
    return canPurchase;
  };

  purchaseHandler = (value = true) => {
    this.setState({ purchasing: value });
  };

  purchaseContinueHandler = () => {
    this.props.history.push(`/checkout`);
  };

  componentDidMount() {
    // axios.get("/ingredients.json").then(
    //   (response) => {
    //     this.setState({ ingredients: response.data, loading: false });
    //   },
    //   (error) => {
    //     console.log(`[BurgerBuilder] error: ${error}`);
    //   }
    // );
  }

  render() {
    console.log(this.props);
    const disableIngredients = { ...this.props.ingredients };
    for (let key in disableIngredients) {
      disableIngredients[key] = disableIngredients[key] <= 0;
    }

    let modalContent = null;
    let burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          added={this.props.onIngredientAdded}
          removed={this.props.onIngredientRemoved}
          disabled={disableIngredients}
          price={this.props.totalPrice}
          purchasable={() => this.updatePurchasable(this.props.ingredients)}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );

    if (this.props.ingredients)
      modalContent = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={() => this.purchaseHandler(false)}
          price={this.props.totalPrice}
        />
      );

    if (!this.props.ingredients) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name, price) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
        price: price,
      }),
    onIngredientRemoved: (name, price) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
        price: price,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErorHandling(BurgerBuilder, axios));
