import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookControl from "./BookControl";

class BookDetails extends Component {
  state = {
    book: {},
    error: false,
  };

  /**
   * @description The function to get the book info from its ID.
   * @param {string} bookID 
   */
  getBook = (bookID) => {
    BooksAPI.get(bookID)
      .then((res) => {
        const book = {
          ...res,
          shelf: this.props.lookForBookShelf(res),
        };
        this.setState({ book });
      })
      .catch((err) => this.setState({ error: true }));
  };

  /**
   * @description The function when the book is wanted to move thorough shelves.
   * @param {string} bookid - Book ID
   * @param {string} shelf - Shelf alias
   */
  moveHandler = (bookid, shelf) => {
    this.props
      .onMoveBook(bookid, shelf)
      .then(() => this.getBook(this.props.bookID));
  };

  componentDidMount() {
    this.getBook(this.props.bookID);
  }

  componentWillUnmount() {
    this.setState({ book: {} });
  }

  render() {
    const { book } = this.state;

    return (
      <div className="book-details">
        <Link to="/"><button className="close-search">Close</button></Link>
        <div className="book-top">
          <img
            className="book-cover"
            src={`${book.imageLinks ? book.imageLinks.thumbnail : ""}`}
            alt={book.title}
          />
          <BookControl
            shelf={book.shelf}
            onChange={(e) => this.moveHandler(book.id, e.target.value)}
            // onChange={(e) => this.props.onMoveBook(book.id, e.target.value)}
          />
        </div>
        <div className="book-title">
          {book.title && <p>{`${book.title}`}</p>}
        </div>
        <div className="book-subtitle">
          {book.subtitle && <p>{`${book.subtitle}`}</p>}
        </div>
        <div className="book-authors">
          {book.authors && <p>{book.authors.join(", ")}</p>}
        </div>
        <div className="book-rating">
          {book.averageRating && book.ratingsCount && (
            <p>{`Rating: ${book.averageRating.toFixed(1)} (by ${book.ratingsCount} votes)`}</p>
          )}
        </div>
        <div className="book-publish-info">
          {book.publisher && <p>{`Publisher: ${book.publisher}`}</p>}
        </div>
        <div className="book-page-count">
          {book.pageCount && <p>{`${book.pageCount} Pages`}</p>}
        </div>
        <div className="book-version">
          {book.contentVersion && <p>{`Version: ${book.contentVersion}`}</p>}
        </div>
        <div className="book-links">
          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
            </a>
          )}
          {book.infoLink && (
            <a href={book.infoLink} target="_blank" rel="noopener noreferrer">
              Info
            </a>
          )}
          {book.canonicalVolumeLink && (
            <a
              href={book.canonicalVolumeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Canonical
            </a>
          )}
        </div>
        <div className="book-categories">
          {book.categories && (
            <p>
              {`${book.categories.length > 1 ? "Categories" : "Category"}: ${book.categories.join(", ")}`}
            </p>
          )}
        </div>
        <div className="book-description">
          {book.description && <p>{book.description}</p>}
        </div>
        <div className="book-industry-identifiers">
          {book.industryIdentifiers &&
            book.industryIdentifiers.map((id, index) => (
              <p key={`IND_ID__${index}`}>
                {id.type}: {id.identifier}
              </p>
            ))}
        </div>
      </div>
    );
  }
}

BookDetails.propTypes = {
  bookID: PropTypes.string.isRequired,
  lookForBookShelf: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default BookDetails;
