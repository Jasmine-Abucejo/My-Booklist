import { useBookStore } from "../store/books";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import Card from "./Card";

const List = () => {
  const { books, fetchBooks, editBook, deleteBook } = useBookStore();
  useEffect(() => {
    fetchBooks();
  }, []);
  let selectedBook;
  const [updateBook, setUpdateBook] = useState({
    _id: "",
    title: "",
    author: "",
    status: "",
  });
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleSelect = (e, id) => {
    // console.log(updateModal);
    selectedBook = books.find((book) => book._id === id);
    // console.log(selectedBook._id);
    if (selectedBook) {
      // console.log(selectedBook);
      setUpdateBook(selectedBook);
    } else {
      console.log(updateBook);
    }

    // setUpdateModal(true);
  };
  const handleEdit = (e, id) => {
    handleSelect(e, id);
    setUpdateModal(true);
  };
  const handleDelete = (e, id) => {
    handleSelect(e, id);
    setDeleteModal(true);
  };
  const saveUpdate = async (id, updatedBook) => {
    // console.log(id, updatedBook);
    const { success, message } = await editBook(id, updatedBook);
    if (success) {
      toast.success(message);
      setUpdateModal(false);
    } else {
      toast.error(message);
    }
  };
  const saveDelete = async (id) => {
    const { success, message } = await deleteBook(id);
    if (success) {
      toast.success(message);
      setDeleteModal(false);
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="relative">
      <div
        className={`${
          updateModal || deleteModal
            ? "opacity-30 pointer-events-none"
            : "opacity-100"
        } flex flex-col justify-center items-center  text-center h-dvh`}
      >
        <p className="text-lg font-bold mb-8">MY BOOKLIST</p>
        <div className="grid grid-rows-3 border-2 size-4/5 bg-cyan-950">
          <div className="border-b-2 w-full max-w-full overflow-x-auto ">
            <p className="border-b-2 sticky left-0 bg-cyan-500">
              Currently Reading
            </p>
            <div className="flex  whitespace-nowrap ">
              {books
                .filter((book) => book.status === "Currently Reading")
                .map((book) => (
                  <Card
                    key={book._id}
                    book={book}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
          <div className="border-b-2 w-full max-w-full overflow-x-auto">
            <div className="border-b-2 sticky left-0 bg-cyan-500">
              Finished Reading
            </div>

            <div className="flex  whitespace-nowrap ">
              {books
                .filter((book) => book.status === "Finished Reading")
                .map((book) => (
                  <Card
                    key={book._id}
                    book={book}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
          <div className="w-full max-w-full overflow-x-auto ">
            <p className="border-b-2 sticky left-0 bg-cyan-500">To Be Read</p>
            <div className="flex  whitespace-nowrap ">
              {books
                .filter((book) => book.status === "To Be Read")
                .map((book) => (
                  <Card
                    key={book._id}
                    book={book}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          !updateModal ? "hidden" : "absolute z-50 top-20 right-1/4  "
        } border-2 w-1/2 h-auto bg-cyan-500 border-white `}
      >
        <IoMdCloseCircle
          className="absolute right-0 cursor-pointer"
          onClick={() => setUpdateModal(false)}
        />
        <div className="text-center m-4 grid grid-cols-2 gap-2 p-4">
          <p className="col-span-2 font-bold">Update Form</p>
          <label className="text-white">Title: </label>
          <input
            type="text"
            value={updateBook.title}
            onChange={(e) =>
              setUpdateBook({ ...updateBook, title: e.target.value })
            }
            className="border-2 bg-cyan-800"
          />
          <label className="text-white">Author: </label>
          <input
            type="text"
            value={updateBook.author}
            onChange={(e) =>
              setUpdateBook({ ...updateBook, author: e.target.value })
            }
            className="border-2 bg-cyan-800"
          />
          <label className="text-white">Status: </label>
          <select
            name="status"
            id="status"
            className="border-2 bg-cyan-800"
            value={updateBook.status}
            onChange={(e) =>
              setUpdateBook({ ...updateBook, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="To Be Read">To Be Read</option>
            <option value="Finished Reading">Finished Reading</option>
          </select>
          {/* {updateBook.status === "Currently Reading" && (
          <>
            <label className="text-cyan-500">Chapter: </label>
            <input type="number" className="border-2 bg-cyan-800" />{" "}
          </>
        )} */}

          <button
            className="col-span-2 bg-green-500 border-2"
            onClick={() => saveUpdate(updateBook._id, updateBook)}
          >
            UPDATE
          </button>
        </div>
      </div>
      <div
        className={`${
          !deleteModal ? "hidden" : "absolute z-50 top-20 right-1/4  "
        } border-2 w-1/2 h-auto bg-cyan-500 border-white `}
      >
        <IoMdCloseCircle
          className="absolute right-0 cursor-pointer"
          onClick={() => setDeleteModal(false)}
        />
        <div className="text-center m-4 flex flex-col gap-2 p-4 justify-center">
          <p className="font-bold">Delete Confirmation</p>
          <p className="text-lg">
            Are you sure you want to delete <i>{updateBook.title}</i> ?
          </p>
          <p className="text-xs">Note: This action is irreversible</p>
          <button
            className=" bg-red-500 border-2"
            onClick={() => saveDelete(updateBook._id)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
