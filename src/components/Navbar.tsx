import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-amber-600" />
            <span className="text-xl font-bold">Fluminense Library</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/books" className="text-gray-700 hover:text-amber-600">
              Books
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-amber-600">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}