import { Bell, UserCircle,ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex header-nav space-between">
      <h1 className="text-xl font-bold">Linh shop</h1>
      <div className="flex user-nav">
        <ShoppingCart size={24} />
        <UserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
