'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              MOBA Game
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <Link
                  href="/hero/create"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Hero
                </Link>
                <Link
                  href="/battle"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Battle
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {loading ? (
              <div className="text-gray-300">Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <div className="text-white text-sm font-medium">{user.nickname}</div>
                  <div className="text-gray-400 text-xs">
                    Last login: {formatDate(user.lastLoginAt)}
                  </div>
                </div>
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.nickname}
                      width={90}
                      height={90}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {user.nickname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="ml-4 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden md:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 hidden md:flex">
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/profile"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/hero/create"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create Hero
          </Link>
          <Link
            href="/battle"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Battle
          </Link>
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          
          {!user && (
            <>
              <Link
                href="/auth/signin"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
          
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.nickname}
                        width={90}
                        height={90}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-indigo-600 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {user.nickname.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.nickname}</div>
                  <div className="text-sm font-medium text-gray-400">
                    Last login: {formatDate(user.lastLoginAt)}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 