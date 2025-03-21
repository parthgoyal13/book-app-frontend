import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/booksSlice";
import BookList from "./BookList";

const BookView = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="card p-4 shadow">
      <h2 className="text-center">Book List</h2>
      {status === "loading" ? (
        <p className="text-center text-warning">Loading...</p>
      ) : status === "failed" ? (
        <p className="text-center text-danger">Error: {error}</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};
export default BookView;
