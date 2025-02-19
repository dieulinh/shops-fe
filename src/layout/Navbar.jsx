import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Linh Lan shop</h1>
      <div className="flex space-x-4">
        <Bell size={24} />
        <UserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
