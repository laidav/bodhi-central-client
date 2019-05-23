import React from "react";
import "./DeleteWarning.scss";

const DeleteWarning = ({ warningText, hideDeleteWarning, handleDelete }) => {
  return (
    <div className={"delete-warning"}>
      <div className={"delete-warning__dialog border"}>
        <p>{warningText}</p>
        <button onClick={hideDeleteWarning} className={"btn"}>
          Cancel
        </button>
        <button onClick={handleDelete} className={"btn"}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteWarning;
