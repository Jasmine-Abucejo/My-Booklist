import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Card = ({ book, handleEdit, handleDelete }) => {
  return (
    <div
      key={book._id}
      className="border-2 rounded inline-block p-2 mx-2 mt-2 bg-cyan-800"
    >
      <p className="text-2xl">{book.title}</p>
      <p className="text-lg">{book.author}</p>

      <button
        onClick={(e) => handleEdit(e, book._id)}
        className="border-2 bg-green-500 text-sm p-0.5 inline-block cursor-pointer"
      >
        <FaEdit className="edit" />
      </button>
      <button
        onClick={(e) => handleDelete(e, book._id)}
        className="border-2 bg-red-500 text-sm p-0.5 inline-block cursor-pointer"
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default Card;
