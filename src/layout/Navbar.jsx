import { UserCircle } from "lucide-react";
import CartIcon from "@/components/cart/CartIcon.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex header-nav space-between">
      <h1 className="font-bold"><Link to={'/'} className={"brand-txt"}>Lynn's Homestead</Link></h1>
      <div className="flex user-nav" style={{ gap: 16, alignItems: 'center' }}>
        <Link to={'/recipes'} className="nav-link">Recipes</Link>
        <Link to={'/cart'}>
          <CartIcon size={36} />
        </Link>
        <UserCircle size={36} />
      </div>
    </nav>
  );
};

export default Navbar;
