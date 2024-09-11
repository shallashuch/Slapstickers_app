import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterButton = (props) => {
  return (
    <button
      className="btn-filters"
      onClick={props.onClick}
      style={{ filter: props.filterStyle }}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};

export default FilterButton;
