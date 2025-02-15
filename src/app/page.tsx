"use client";

import AnimatedButton from "@/components/AnimatedButton";
import { getAllMenusPermissionsByUser } from "@/services/menuService";
import Link from "next/link";

export default function LandingPage() {

  
  
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32 lg:py-48">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-teal-500">Sabhalwal Finance</span>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
          Explore a world of finance and innovation. Manage your goals with ease
          and efficiency.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about">
            
            
          </Link>
          <div className="flex gap-4">
          <AnimatedButton label="Contact Us" href="/contact" />
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 sm:py-24 lg:py-32 bg-gray-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-teal-500 text-black rounded-full">
              📈
            </div>
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-400">
              Gain insights into your financial data with our advanced
              analytics tools.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-teal-500 text-black rounded-full">
              🔒
            </div>
            <h3 className="text-xl font-semibold mb-4">Security</h3>
            <p className="text-gray-400">
              Your data is protected with industry-leading security measures.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-teal-500 text-black rounded-full">
              🌐
            </div>
            <h3 className="text-xl font-semibold mb-4">Global Access</h3>
            <p className="text-gray-400">
              Access our platform from anywhere in the world, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="px-6 py-8 bg-gray-800 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Our Platform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
