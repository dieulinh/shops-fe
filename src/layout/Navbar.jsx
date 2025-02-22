import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex header-nav space-between">
      <h1 className="text-xl font-bold">Linh shop</h1>
      <div className="flex space-x-4">
        <Bell size={24} />
        <UserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
