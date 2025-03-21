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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <BookList books={books} />
    </div>
  );
};
export default BookView;
