import React, { Component } from "react";

import "./Courses.css";

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: "Angular - The Complete Guide" },
      { id: 2, title: "Vue - The Complete Guide" },
      { id: 3, title: "PWA - The Complete Guide" },
    ],
  };

  clickHandler = (id) => {
    console.log(`Clicked course ${id}`);
    console.log(this.props);
    this.props.history.push(
      `/courses/course?id=${id}&title=${
        this.state.courses.filter((el) => el.id === id)[0].title
      }`
    );
  };

  render() {
    let content = (
      <section className="Courses">
        {this.state.courses.map((course) => {
          return (
            <article
              className="Course"
              key={course.id}
              onClick={() => this.clickHandler(course.id)}
            >
              {course.title}
            </article>
          );
        })}
      </section>
    );

    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        {content}
      </div>
    );
  }
}

export default Courses;
