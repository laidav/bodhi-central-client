import React from "react";
import "./DeleteWarning.scss";

const DeleteWarning = ({ warningText, hideDeleteWarning, handleDelete }) => {
  return (
    <div className={"delete-warning"}>
      <div className={"delete-warning__dialog border"}>
        <p>{warningText}</p>
        <div className={"delete-warning__footer"}>
          <button
            type={"button"}
            onClick={hideDeleteWarning}
            className={"btn btn-inverted-gray"}
          >
            Cancel
          </button>
          <button
            type={"button"}
            onClick={handleDelete}
            className={"btn btn-danger"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarning;
