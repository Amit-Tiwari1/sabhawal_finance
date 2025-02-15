"use client";
import Link from "next/link";
export default function LoginBtn() {

  return (
    <p>
    <Link
      href="/login"
      className="block px-4 py-2 bg-teal-500 text-black rounded-full hover:bg-teal-600 hover:text-white transition duration-300 text-center"
    >
      Login
    </Link>
  </p>
  )
}
