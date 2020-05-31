import React, { Component } from "react";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandling/withErrorHandling";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios.order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { purchaseOrderSuccess, purchaseFailed } from "../../../store/actions";
import { Redirect } from "react-router";

class ContactData extends Component {
  state = {
    form: {
      name: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Your full name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Street Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      country: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        type: "input",
        config: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
      },
      email: {
        type: "input",
        config: {
          type: "email",
          placeholder: "EMail Id",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        type: "select",
        config: {
          type: "select",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    isFormValid: false,
  };

  orderClickHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let field in this.state.form) {
      formData[field] = this.state.form[field].value;
    }
    const orderData = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onPurchagseHandler(orderData);
  };

  checkValidity = (val, rule) => {
    let isValid = true;
    if (rule.required) isValid &= val.trim() !== "";
    if (rule.minLength) isValid &= val.length >= rule.minLength;
    return isValid;
  };
  inputChangedHandler = (event, key) => {
    // console.log(event.target.value);
    // console.log(key);
    const updatedForm = { ...this.state.form };
    updatedForm[key].value = event.target.value;
    updatedForm[key].touched = true;
    updatedForm[key].valid = this.checkValidity(
      event.target.value,
      updatedForm[key].validation
    );
    let isFormValid = true;
    for (let c in this.state.form) {
      isFormValid = this.state.form[c].valid && isFormValid;
    }
    console.log(isFormValid);
    this.setState({
      form: updatedForm,
      isFormValid: isFormValid,
    });
  };

  render() {
    if (this.props.purchased) return <Redirect to="/" />;
    const formContent = Object.keys(this.state.form).map((key) => {
      const formField = this.state.form[key];
      return (
        <Input
          type={formField.type}
          config={formField.config}
          key={key}
          changed={(event) => this.inputChangedHandler(event, key)}
          valid={formField.valid}
          touched={formField.touched}
          name={key}
        />
      );
    });
    let form = (
      <form onSubmit={this.orderClickHandler}>
        {formContent}
        <Button
          btnType="Success"
          clicked={this.orderClickHandler}
          disabled={!this.state.isFormValid}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onPurchagseHandler: (orderData) =>
      dispatch(purchaseOrderSuccess(orderData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withErrorHandler(ContactData, axios));
