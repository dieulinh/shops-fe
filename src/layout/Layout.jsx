import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="">
      <Sidebar />
      <div className="">
        <Navbar />
        <main className="">
          <Outlet />
        </main>
        {/*<Footer />*/}
      </div>
    </div>
  );
};

export default Layout;
