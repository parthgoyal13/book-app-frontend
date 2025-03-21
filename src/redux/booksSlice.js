import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://book-app-backend-omega.vercel.app/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addBook = createAsyncThunk("books/addBooks", async (newBook) => {
  const response = await axios.post(url, newBook);
  return response.data;
});

export const deleteBookAsync = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    console.log("Sending DELETE request to:", `${url}/${bookId}`);
    await axios.delete(`${url}/${bookId}`);
    return bookId;
  }
);

export const updateBookAsync = createAsyncThunk(
  "books/updateBook",
  async ({ id, title, author, genre }) => {
    const response = await axios.put(`${url}/${id}`, { title, author, genre });
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });
    builder.addCase(deleteBookAsync.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    });
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );

      if (index !== -1) {
        state.books[index] = action.payload;
      }
    });
  },
});
export default booksSlice.reducer;
