import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="container w-100">
      <Sidebar />
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
