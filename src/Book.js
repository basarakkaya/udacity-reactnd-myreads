import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookControl from "./BookControl";

function book({ book, onMoveBook }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <img
            className="book-cover"
            src={`${
              book.imageLinks ? book.imageLinks.thumbnail : ""
            }`}
            alt={book.title}
          />
          <BookControl
            shelf={book.shelf}
            onChange={(e) => onMoveBook(book.id, e.target.value)}
          />
        </div>
        <Link to={`/book/${book.id}`}>
          <div className="book-title">{book.title}{book.subtitle && `, ${book.subtitle}`}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}
          </div>
        </Link>
      </div>
    </li>
  );
}

book.propTypes = {
  book: PropTypes.object.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default book;
