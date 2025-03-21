import React from "react";
import { useDispatch } from "react-redux";
import { deleteBookAsync } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (bookId) => {
    console.log("Deleting book with ID:", bookId);
    dispatch(deleteBookAsync(bookId));
  };

  const handleEdit = (book) => {
    navigate("/edit-book", { state: book });
  };

  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author} -{book.genre}
              <button onClick={() => handleDelete(book._id)}>
                Delete
              </button>{" "}
              <button onClick={() => handleEdit(book)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default BookList;
