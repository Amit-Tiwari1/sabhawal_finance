"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-teal-500">Sabharwal Finance</div>

        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <ul
          className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static bg-black w-full md:w-auto left-0 top-16 md:top-auto ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <li>
            <Link
              href="/"
              className="block px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block px-4 py-2 bg-teal-500 text-black rounded-full hover:bg-teal-600 hover:text-white transition duration-300 text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
