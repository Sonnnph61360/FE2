import { Toaster } from "react-hot-toast";
import { Link, Routes, Route } from "react-router-dom";
import Lab6 from "./LAB/lab6";
import Lab5 from "./LAB/lab5";
import Lab3 from "./LAB/Lab3";
import Lab4 from "./LAB/lab4";
import List from "./page/List";
import Add from "./page/Add";
import Login from "./page/Login";
import Register from "./page/Register";

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="*" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/lab3" element={<Lab3 />} />
        <Route path="/lab4" element={<Lab4 />} />
        <Route path="/lab5" element={<Lab5 />} />
        <Route path="/edit/:id" element={<Lab6 />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;