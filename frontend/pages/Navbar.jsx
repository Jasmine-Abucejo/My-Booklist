import { FaCirclePlus } from "react-icons/fa6";
import { RiBookShelfFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="lg:w-1/20 lg:min-h-1/2 bg-cyan-500 flex lg:grid lg:grid-rows-2 gap-4 p-4 items-center justify-center">
      <Link to="/new" className="lg:border-b-2 flex-1">
        <FaCirclePlus className="w-10 h-auto" />
      </Link>
      <Link to="/" className="lg:border-b-2 ">
        <RiBookShelfFill className="w-10 h-auto" />
      </Link>
    </div>
  );
};

export default Navbar;
