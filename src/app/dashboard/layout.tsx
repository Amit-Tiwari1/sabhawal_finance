"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
     
      <div
        className={`fixed top-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static lg:transform-none`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Sidebar Toggle Button */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded bg-gray-800 text-white absolute top-4 right-4 mt-14"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-2xl " />
            ) : (
              <FaBars className="text-2xl " />
            )}
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
