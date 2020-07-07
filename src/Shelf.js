import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function shelf({ books, title, onMoveBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book
              key={`${title}__${index}`}
              book={book}
              onMoveBook={onMoveBook}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default shelf;
