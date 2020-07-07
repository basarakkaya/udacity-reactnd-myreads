import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Shelf from "./Shelf";

const shelves = [
  { alias: "currentlyReading", title: "Currently Reading" },
  { alias: "wantToRead", title: "Want To Read" },
  { alias: "read", title: "Read" },
];

function listPage({ books, onMoveBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <Shelf
              key={`Shelf__${shelf.alias}`}
              books={books.filter((book) => book.shelf === shelf.alias)}
              title={shelf.title}
              onMoveBook={onMoveBook}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

listPage.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default listPage;
