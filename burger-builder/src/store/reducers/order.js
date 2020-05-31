import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: true,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER_SUCCESS:
      return {
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
        loading: false,
        purchased: true,
        error: null,
      };
    case actionTypes.PURCHASE_ORDER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        purchased: true,
      };

    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        orders: [],
        error: null,
        loading: true,
      };

    case actionTypes.FETCH_OREDRS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };

    case actionTypes.FETCH_OREDRS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      console.log(`[Order Reducer] Invalid action`);
  }
  return state;
};

export default reducer;
