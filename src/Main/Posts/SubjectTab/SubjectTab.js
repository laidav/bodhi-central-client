import React, { Component } from "react";
import "./SubjectTab.scss";

class SubjectTab extends Component {
  handleClick = () => {
    const { clickHandler, subject } = this.props;
    clickHandler(subject);
  };

  render() {
    const { subject, isActive } = this.props;

    const mainSubjects = {
      11: "Wisdom",
      10: "Ethics",
      9: "Meditation"
    };

    return (
      <li
        className={`subject-tab${isActive ? " subject-tab--active" : ""}`}
        onClick={this.handleClick}
      >
        <span className="subject-tab__label">{mainSubjects[subject]}</span>
      </li>
    );
  }
}

export default SubjectTab;
