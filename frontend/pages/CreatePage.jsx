import { useState } from "react";
import { useBookStore } from "../store/books";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    status: "",
  });
  const { addBook } = useBookStore();
  const addNew = async () => {
    const { success, message } = await addBook(newBook);
    setNewBook({ title: "", author: "", status: "" });
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-lvh">
      <p className="text-lg font-bold mb-8 mt-8">ADD BOOK</p>
      <div className="grid grid-cols-2 gap-2 border-2 p-4 bg-cyan-950">
        <label className="text-cyan-500">Title: </label>
        <input
          type="text"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border-2 bg-cyan-800"
        />
        <label className="text-cyan-500">Author: </label>
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border-2 bg-cyan-800"
        />
        <label className="text-cyan-500">Status: </label>
        <select
          name="status"
          id="status"
          className="border-2 bg-cyan-800"
          value={newBook.status}
          onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="To Be Read">To Be Read</option>
          <option value="Finished Reading">Finished Reading</option>
        </select>
        {/* {newBook.status === "Currently Reading" && (
          <>
            <label className="text-cyan-500">Chapter: </label>
            <input type="number" className="border-2 bg-cyan-800" />{" "}
          </>
        )} */}

        <button className="col-span-2 bg-green-500 border-2" onClick={addNew}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
