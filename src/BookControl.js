import React from "react";
import PropTypes from "prop-types";

function bookControl({ onChange, shelf }) {
  return (
    <div className="book-shelf-changer">
      <select value={shelf} onChange={onChange}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

bookControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  shelf: PropTypes.string,
};

export default bookControl;
