import { create } from "zustand";
import API_URL from "../src/api";
export const useBookStore = create((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  fetchBooks: async () => {
    const res = await fetch(`${API_URL}/api/books`);
    const data = await res.json();
    set({ books: data.data });
  },
  addBook: async (newBook) => {
    if (!newBook.title || !newBook.author || !newBook.status) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch(`${API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await res.json();
    set((state) => ({ books: [...state.books, data.data] }));
    return { success: true, message: "Successfully added" };
  },
  editBook: async (id, editBook) => {
    if (!editBook.title || !editBook.author || !editBook.status) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBook),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: "Failed updating record" };
    }
    set((state) => ({
      books: state.books.map((book) => (book._id === id ? data.data : book)),
    }));
    return { success: true, message: "Successfully updated" };
  },
  deleteBook: async (id) => {
    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: "Failed to delete book" };
    }
    set((state) => ({
      books: state.books.filter((book) => book._id !== id),
    }));
    return { success: true, message: data.message };
  },
}));
