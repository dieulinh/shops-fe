import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = localStorage.getItem('access_token');

  // const {auth} = useSelector((state) => state.auth);
  // console.log('auth',auth)
  console.log('1');
  setTimeout(() => console.info('2'), 5);
  console.log('3');
  setTimeout(() => console.info('4'), 0);
  console.log('5');
  const userData = localStorage.getItem('userData')||{};

  return (
    <div className={`sidebar-container ${isOpen ? "w-100" : "w-20"} transition-all`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-5 text-gray-400">
        <Menu size={24} />
      </button>
      <ul className="left-menu">
        <li>
          <Link to="/products" className="flex items-center space-x-3">
            {isOpen && <span>Products</span>}
          </Link>
        </li>
        <li>
          <Link to="/recipes" className="flex items-center space-x-3">
            {isOpen && <span>Recipes</span>}
          </Link>
        </li>

        <li>
          {!user && (<Link to="/login" className="flex items-center space-x-3">
            {isOpen && <span>Login</span>}
          </Link>)}

          {user && (<Link to="/logout" className="flex items-center space-x-3">
            {isOpen && <span>Logout</span>}
          </Link>)}
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
