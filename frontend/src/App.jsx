import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import TestPayment from './pages/TestPayment';
import Wishlist from './pages/Wishlist';
import AIRecommendationsPage from './pages/AIRecommendationsPage';
import About from './pages/About';           // ✅ New
import Contact from './pages/Contact';       // ✅ New

const App = () => {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore.persist.hasHydrated();
  const darkMode = useThemeStore((state) => state.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      {token && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={token ? "/home" : "/register"} />} />
        <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
        <Route path="/about" element={<About />} />           {/* ✅ Public */}
        <Route path="/contact" element={<Contact />} />       {/* ✅ Public */}

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/test-payment" element={<ProtectedRoute><TestPayment /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendationsPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
