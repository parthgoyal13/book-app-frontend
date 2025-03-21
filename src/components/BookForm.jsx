import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBookAsync } from "../redux/booksSlice";
import { useNavigate, useLocation } from "react-router-dom";

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const existingBook = location.state || null;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (existingBook) {
      setTitle(existingBook.title);
      setAuthor(existingBook.author);
      setGenre(existingBook.genre);
    }
  }, [existingBook]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author || !genre) {
      alert("Please fill all fields");
      return;
    }

    const bookData = { title, author, genre };

    if (existingBook) {
      dispatch(updateBookAsync({ id: existingBook._id, ...bookData }));
    } else {
      dispatch(addBook(bookData));
    }
    setTitle("");
    setAuthor("");
    setGenre("");
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{existingBook ? "Edit Book" : "Add a Book"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">
          {existingBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </>
  );
};
export default BookForm;
