import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios.order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";

class Orders extends Component {
  state = {
    orders: {},
    loading: true,
  };
  componentDidMount() {
    axios.get("/orders.json").then((resp) => {
      this.setState({
        orders: resp.data,
        loading: false,
      });
    });
  }
  render() {
    let orderContent = <Spinner />;
    if (!this.state.loading) {
      orderContent = Object.keys(this.state.orders).map((key) => {
        return <Order orderDetails={this.state.orders[key]} key={key} />;
      });
    }
    return <div>{orderContent}</div>;
  }
}

export default withErrorHandling(Orders, axios);
