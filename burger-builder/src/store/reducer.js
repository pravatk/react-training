import * as actionTypes from "./action";

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + action.price,
      };
    case actionTypes.REMOVE_INGREDIENT:
      console.log(`[Remove Reducer]`, action);
      const newIngredients = state.ingredients;
      if (newIngredients[action.ingredientName] > 0) {
        newIngredients[action.ingredientName] =
          newIngredients[action.ingredientName] - 1;
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice: state.totalPrice - action.price,
        };
      }
      break;
    default:
      console.log(`No known action published`, action);
  }
  return state;
};

export default reducer;
