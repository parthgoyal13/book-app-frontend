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
      {books.length === 0 ? (
        <p className="text-center text-muted">No books available</p>
      ) : (
        <ul className="list-group">
          {books.map((book) => (
            <li
              key={book._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{book.title}</strong> by {book.author} - {book.genre}
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default BookList;
