import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  // Handle logout
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert("Logged out!");
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            PortfolioBuilder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/templates" className="text-gray-700 hover:text-blue-600">Templates</Link>
            <div className="text-gray-700 hover:text-blue-600 cursor-pointer">
              {user ? (
                <button onClick={logOut}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/templates" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Templates</Link>
          <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            {user ? (
              <button onClick={logOut}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
