import React, { Component } from "react";

import classes from "./Person.css";

class Person extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(`[Person.js] shouldComponentUpdare`);
    return true;
  }

  render() {
    console.log("[Person.js] rendering...");
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(`[Person.js] getSnapshotBeforeUpdate`);
    return "snap";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`[Person.js] componentDidUpdate, ${snapshot}`);
  }
}

export default Person;
