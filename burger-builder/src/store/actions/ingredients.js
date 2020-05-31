import * as actionTypes from "./actionTypes";
import axios from "../../axios.order";

export const addIngredient = (name, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
    price: price,
  };
};

export const removeIngredient = (name, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
    price: price,
  };
};

const initIgredientAction = (data, loading) => {
  return {
    type: actionTypes.INIT_INGREDIENT,
    ingredients: data,
    loading: loading,
  };
};

const fetchIngredientError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};
export const initIngredient = () => {
  return (dispatch) => {
    axios.get("/ingredients.json").then(
      (response) => {
        dispatch(initIgredientAction(response.data, false));
      },
      (error) => {
        console.log(`[BurgerBuilder] error: ${error}`);
        dispatch(fetchIngredientError());
      }
    );
  };
};
