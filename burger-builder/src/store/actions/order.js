import * as actionTypes from "./actionTypes";
import axios from "../../axios.order";

const purhcaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseFailed = (err) => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    error: err,
  };
};

export const purchaseOrderSuccess = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseStarted());
    axios.post("/orders.json", orderData).then(
      (response) => {
        console.log(response.data);
        dispatch(purhcaseSuccess(response.data.name, orderData));
      },
      (error) => {
        console.log(error);
        dispatch(purchaseFailed(error));
      }
    );
  };
};

export const purchaseStarted = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

const fetchOrderFailed = (err) => {
  return {
    type: actionTypes.FETCH_OREDRS_FAILED,
    error: err,
  };
};

const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_OREDRS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then((resp) => {
        dispatch(fetchOrderSuccess(resp.data));
      })
      .catch((error) => {
        dispatch(fetchOrderFailed(error));
      });
  };
};
