import * as actionTypes from "../actions/actionTypes";
import { addIngredient, removeIngredient } from "../actions";
import { updateObject } from "../util";

const initialState = {
  ingredients: null,
  loading: true,
  totalPrice: 4,
  error: false,
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + action.price,
  };
};

const removeIngredient = (state, action) => {
  const newIngredients = state.ingredients;
  if (newIngredients[action.ingredientName] > 0) {
    newIngredients[action.ingredientName] =
      newIngredients[action.ingredientName] - 1;
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      },
      totalPrice: state.totalPrice - action.price,
    };
  }
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.INIT_INGREDIENT:
      console.log(`Initialized Ingredients`, action);
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        loading: false,
      });
    case actionTypes.FETCH_INGREDIENT_FAILED:
      console.log(`Initialized Ingredients`, action);
      return updateObject(state, { loading: false });
    default:
      console.log(`No known action published`, action);
  }
  return state;
};

export default reducer;
