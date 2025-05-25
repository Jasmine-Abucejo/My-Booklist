import { Route, Routes } from "react-router-dom";
import Navbar from "../pages/Navbar";
import CreatePage from "../pages/CreatePage";
import List from "../pages/List";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" flex h-screen bg-cyan-800">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/new" element={<CreatePage />}></Route>
          <Route path="/" element={<List />}></Route>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
