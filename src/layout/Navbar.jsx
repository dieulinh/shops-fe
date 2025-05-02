import { UserCircle,ShoppingCart } from "lucide-react";
import CartIcon from "@/components/cart/CartIcon.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex header-nav space-between">
      <h1 className="font-bold"><Link to={'/'} className={"brand-txt"}>Linh shop</Link></h1>
      <div className="flex user-nav">
        <Link to={'/cart'}><ShoppingCart size={24} />
        <CartIcon /></Link>
        <UserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
