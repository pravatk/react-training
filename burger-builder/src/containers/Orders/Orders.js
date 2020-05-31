import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios.order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { fetchOrder } from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onInit();
  }
  render() {
    let orderContent = <Spinner />;
    if (!this.props.loading) {
      orderContent = Object.keys(this.props.orders).map((key) => {
        return <Order orderDetails={this.props.orders[key]} key={key} />;
      });
    }
    return <div>{orderContent}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => dispatch(fetchOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios));
