import { Bell, UserCircle,ShoppingCart } from "lucide-react";
import CartIcon from "@/components/cart/CartIcon.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex header-nav space-between">
      <h1 className="text-xl font-bold"><Link to={'/'}>Linh shop</Link></h1>
      <div className="flex user-nav">
        <ShoppingCart size={24} />
        <CartIcon />
        <UserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
