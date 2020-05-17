import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios.order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      pin: "",
    },
    loading: false,
  };

  orderClickHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post("/orders.json", {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: {
          name: "Pravat",
          email: "someone@test.com",
          address: {
            pin: 73779,
            city: "Bangalore",
          },
        },
      })
      .then(
        (response) => {
          console.log(response.data);
          this.setState({
            loading: false,
          });
          this.props.history.push("/orders");
        },
        (error) => {
          console.log(error);
          this.setState({
            loading: false,
          });
          this.props.history.push("/");
        }
      );
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your EMail" />
        <input type="text" name="street" placeholder="Your Street Address" />
        <input type="text" name="postalCode" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={this.orderClickHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
