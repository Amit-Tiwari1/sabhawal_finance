'use client'
import { Button } from "@nextui-org/react";
import React from "react";
import { FaDollarSign, FaUsers, FaChartLine, FaUserShield } from "react-icons/fa";
import { MdOutlinePendingActions, MdPersonAdd, MdOutlineRemoveCircle, MdDelete } from "react-icons/md";
import { handleLogout } from "@/services/userService";
import useNotifications from "@/components/useNotification";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const { notifySuccess, notifyError } = useNotifications();
  const onLogout = async () => {
    try {
      const response = await handleLogout();
      if (response.success) {
        notifySuccess(response.message);
        router.push("/");
      }
    } catch (error: unknown) {
      notifyError((error as Error).message);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-between ">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <Button color="primary" className="text-lg" onPress={onLogout}>
        Logout
      </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
        {[
          { title: "Total Revenue", value: "$1,250,000", icon: <FaDollarSign className="text-3xl text-green-500" /> },
          { title: "Total Disbursement", value: "$950,000", icon: <FaChartLine className="text-3xl text-blue-500" /> },
          { title: "Total Pending Recovery", value: "$300,000", icon: <MdOutlinePendingActions className="text-3xl text-yellow-500" /> },
          { title: "Total Related", value: "42", icon: <FaUserShield className="text-3xl text-purple-500" /> },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded shadow-md text-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-700"
          >
            <div className="mb-2">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-200">{card.title}</h2>
            <p className="text-xl font-bold text-blue-600 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Clients", value: "500", icon: <FaUsers className="text-3xl text-teal-500" /> },
          { title: "Total Active Clients", value: "350", icon: <FaUsers className="text-3xl text-green-500" /> },
          { title: "Total Deactive Clients", value: "120", icon: <MdOutlineRemoveCircle className="text-3xl text-red-500" /> },
          { title: "Total About to Onboard", value: "30", icon: <MdPersonAdd className="text-3xl text-yellow-500" /> },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded shadow-md text-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-700"
          >
            <div className="mb-2">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-200">{card.title}</h2>
            <p className="text-xl font-bold text-green-600 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Users", value: "200", icon: <FaUsers className="text-3xl text-blue-500" /> },
          { title: "Total Active Users", value: "150", icon: <FaUsers className="text-3xl text-green-500" /> },
          { title: "Total Deactive Users", value: "40", icon: <MdOutlineRemoveCircle className="text-3xl text-red-500" /> },
          { title: "Total Deleted Users", value: "10", icon: <MdDelete className="text-3xl text-gray-500" /> },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded shadow-md text-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-700"
          >
            <div className="mb-2">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-200">{card.title}</h2>
            <p className="text-xl font-bold text-red-600 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Tables and Visualizations remain unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Latest Recovery */}
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Latest Recovery</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b pb-2">Client</th>
                <th className="border-b pb-2">Amount</th>
                <th className="border-b pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { client: "Client A", amount: "$5,000", date: "2024-12-20" },
                { client: "Client B", amount: "$3,000", date: "2024-12-18" },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{item.client}</td>
                  <td className="border-b py-2">{item.amount}</td>
                  <td className="border-b py-2">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Latest Clients */}
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Latest Clients</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b pb-2">Name</th>
                <th className="border-b pb-2">Status</th>
                <th className="border-b pb-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Client A", status: "Active", joined: "2024-12-15" },
                { name: "Client B", status: "Inactive", joined: "2024-12-10" },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{item.name}</td>
                  <td className="border-b py-2">{item.status}</td>
                  <td className="border-b py-2">{item.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
