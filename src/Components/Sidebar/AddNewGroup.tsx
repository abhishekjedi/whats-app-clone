import React from "react";
import "./AddNewGroup.scss";

const AddNewGroup = () => {
  const createNewGroup = (enteredString: string | null) => {};

  const clickHandler = () => {
    let enteredString = prompt("Write the name of new group");
    createNewGroup(enteredString);
  };

  return (
    <div className="add-new-group">
      <h2 onClick={clickHandler}>Add New Group</h2>
    </div>
  );
};

export default AddNewGroup;
