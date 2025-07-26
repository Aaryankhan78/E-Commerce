import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate('/register');
  };

  const toggleDarkMode = () => {
    setDark((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Added AI Suggestions link here
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/products' },
    { name: 'Deals', to: '/search?q=offers' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
    { name: 'AI Suggestions', to: '/ai-recommendations' },  // NEW LINK
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white shadow-sm sticky top-0 z-50 px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          E-Shop
        </Link>

        <div className="hidden md:flex space-x-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/wishlist"
            className="relative hover:text-indigo-600 dark:hover:text-indigo-400"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={20} />
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-indigo-600 dark:hover:text-indigo-400"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Hi, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="Register"
              title="Register"
            >
              <User size={20} />
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle Menu"
            title="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 font-medium text-gray-700 dark:text-gray-200 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col space-y-1">
              <span className="text-sm">Hi, {user.email}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-600 dark:text-red-400 text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
