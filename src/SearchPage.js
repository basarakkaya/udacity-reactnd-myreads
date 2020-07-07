import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  state = {
    books: [],
    query: "",
  };

  /**
   * @description Prevents repetitive function calls. 
   * Runs the passed function only when it is not called for the delay interval.
   * @param {function} func - Function to be run after debouncing
   * @param {number} delay - Debounce delay
   */
  debounceFunc = (func, delay) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(func, delay);
  };

  /**
   * @description Sets the books state to books array mapped with shelf aliases.
   * @param {array} booksList - Books to be mapped with shelf aliases.
   */
  mapBooks = (booksList) => {
    const books = booksList.map((book) => {
      return {
        ...book,
        shelf: this.props.lookForBookShelf(book),
      };
    });

    this.setState({ books });
  };

  /**
   * @description The function when the book is wanted to move thorough shelves.
   * @param {string} bookid - Book ID
   * @param {string} shelf - Shelf alias
   */
  moveHandler = (bookid, shelf) => {
    this.props.onMoveBook(bookid, shelf).then(() => {
      this.searchBooks(this.state.query)
    })
  }

  /**
   * @description Searches the books data with the query string.
   * @param {string} query - Query string to be searched
   */
  searchBooks = (query) => {
    this.setState({ query });
    query
      ? this.debounceFunc(() => {
          BooksAPI.search(query).then((books) => {
            !books || books.error
              ? this.setState({ books: [] })
              : this.mapBooks(books);
          });
        }, 800)
      : this.setState({ books: [] });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.searchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books &&
              this.state.books.map((book, index) => (
                <Book
                  book={book}
                  onMoveBook={this.moveHandler}
                  key={`Search__Book__${index}`}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  lookForBookShelf: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchPage;
