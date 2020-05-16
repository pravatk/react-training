import React, { Component } from "react";

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((comp) =>
        this.setState({ component: comp.default })
      );
    }

    render() {
      const C = this.state.component;
      return this.state.component ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
