import React from "react";
import "./SubjectTag.scss";

const SubjectTag = ({ data }) => {
  return <span className={"subject-tag"}>{data.name}</span>;
};

export default SubjectTag;
