import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const Header = () => {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            AbaTrade
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-primary-600">
                  <ShoppingCart size={20} />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
            <button className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
