import { Link } from "react-router-dom";
import { Home, Info, Menu } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-900 text-white h-screen p-5 ${isOpen ? "w-64" : "w-20"} transition-all`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-5 text-gray-400">
        <Menu size={24} />
      </button>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center space-x-3">
            <Home size={24} />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center space-x-3">
            <Info size={24} />
            {isOpen && <span>About</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
