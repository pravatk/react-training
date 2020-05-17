import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios.order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
    loading: false,
    isFormValid: false,
  };

  orderClickHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let field in this.state.form) {
      formData[field] = this.state.form[field].value;
    }
    axios
      .post("/orders.json", {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        orderData: formData,
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
