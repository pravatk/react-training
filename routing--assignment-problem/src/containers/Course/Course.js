import React, { Component } from "react";

class Course extends Component {
  render() {
    console.log(this.props);
    const params = new URLSearchParams(this.props.location.search);
    console.log(params);
    return (
      <div>
        <h1>{params.get("title")}</h1>
        <p>You selected the Course with ID: {params.get("id")}</p>
      </div>
    );
  }
}

export default Course;
