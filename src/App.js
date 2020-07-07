import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

import BookDetails from "./BookDetails";
import ListPage from "./ListPage";
import SearchPage from "./SearchPage";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  /**
   * @description Gets all books that are added to shelves by user.
   */
  getAllBooks = () => {
    return new Promise((resolve, reject) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
        resolve();
      });
    });
  };

  /**
   * @description Returns the shelf alias of the book.
   * @param {object} book - Book object
   * @returns {string} shelf alias
   */
  lookForBookShelf = (book) => {
    const owned = this.state.books.filter(
      (ownedBook) => ownedBook.id === book.id
    );

    if (owned.length > 0) return owned[0].shelf;
    else return "none";
  };

  /**
   * @description Moves a book to the desired shelf.
   * @param {string} id - Book ID
   * @param {string} shelf - Shelf alias
   */
  moveBook = (id, shelf) => {
    return new Promise((resolve, reject) => {
      BooksAPI.update({ id }, shelf).then(() => {
        this.getAllBooks().then(() => resolve());
      });
    });
  };

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage
              lookForBookShelf={this.lookForBookShelf}
              onMoveBook={this.moveBook}
            />
          )}
        />
        <Route
          path="/book/:id"
          render={({ match }) => (
            <BookDetails
              bookID={match.params.id}
              lookForBookShelf={this.lookForBookShelf}
              onMoveBook={this.moveBook}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListPage books={this.state.books} onMoveBook={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
