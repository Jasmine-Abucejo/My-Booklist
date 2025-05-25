import mongoose from "mongoose";
import Book from "../model/book.model.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      message: "get successful",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addBook = async (req, res) => {
  const book = req.body;

  if (!book.title || !book.author || !book.status) {
    return res.status(400).json({
      success: false,
      message: "incomplete fields",
    });
  }

  const newBook = new Book(book);
  try {
    await newBook.save();
    res.status(201).json({
      success: true,
      message: "successfully added new book",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error in adding new book" });
    console.log(error.message);
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: "false", message: "Invalid ID" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log(error.message);
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    await Book.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Successfully deleted book" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};
