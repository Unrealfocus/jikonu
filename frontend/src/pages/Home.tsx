import { Link } from 'react-router-dom'
import { ShoppingBag, Shield, Truck, Star } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to AbaTrade
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connecting verified artisans in Aba, Nigeria with buyers in Houston, TX.
            Quality products, verified sellers, secure transactions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Products
            </Link>
            <Link to="/register" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AbaTrade?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Shield className="text-primary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AbaTrade Inspect™</h3>
              <p className="text-gray-600">Quality assurance before every shipment</p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="text-primary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Escrow Protection</h3>
              <p className="text-gray-600">Your payment is protected until delivery</p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Truck className="text-primary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Shipping</h3>
              <p className="text-gray-600">Track your order from Aba to Houston</p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <Star className="text-primary-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">Only trusted artisans on our platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied buyers and sellers on AbaTrade
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
