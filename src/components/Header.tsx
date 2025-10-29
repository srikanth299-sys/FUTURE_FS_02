'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/authStore';

export default function Header() {
  const { items } = useCartStore();
  const { user, isLoggedIn, logout } = useAuthStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MiniShop
          </Link>
          <nav className="flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-gray-900 relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-gray-900">
                  Orders
                </Link>
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
