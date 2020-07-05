import React, { Component } from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;

  return (
    <div>
      <ul className="list-group">
        {items.map((genre) => {
          return (
            <li
              key={genre[valueProperty]}
              onClick={() => onItemSelect(genre)}
              className={
                genre === selectedItem
                  ? "list-group-item active"
                  : "list-group-item "
              }
            >
              {genre[textProperty]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
