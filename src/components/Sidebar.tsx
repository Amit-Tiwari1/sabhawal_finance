"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";
import { getAllMenusPermissionsByUser, getAllMenus } from "@/services/menuService";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const role_id = 0;


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response =
          role_id === 0 ? await getAllMenus() : await getAllMenusPermissionsByUser();
        
          console.log("response", response);
          
        if (response.success) {
          const menuData = role_id === 0 ? response.result : response.userMenus;
          const formattedMenus = menuData.map((menu: any) => ({
            name: menu.MenuName,
            path: menu.MenuUrl || null,
            submenus:
              menu?.Submenus?.map((submenu: any) => ({
                name: submenu?.MenuName,
                path: submenu?.MenuUrl || null,
              })) || [],
          }));
          setMenus(formattedMenus);
        } else {
          setError("Failed to fetch menus.");
        }
      } catch (error) {
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [role_id]);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const renderMenu = (menu: any) => (
    <div key={menu.name} className="flex flex-col">
      {menu.submenus.length > 0 ? (
        <>
          <div
            className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => toggleMenu(menu.name)}
          >
            <span className="ml-3 flex-1">{menu.name}</span>
            {activeMenu === menu.name ? (
              <IoMdArrowDropdown className="text-lg" />
            ) : (
              <IoMdArrowDropright className="text-lg" />
            )}
          </div>
          {activeMenu === menu.name && (
            <div className="ml-6 border-l border-gray-700 pl-4">
              {menu.submenus.map((submenu: any, subIndex: number) => (
                <Link
                  key={subIndex}
                  href={submenu.path || "#"}
                  className={`block py-2 px-2 hover:bg-gray-700 rounded-md ${
                    router.pathname === submenu.path ? "bg-gray-700" : ""
                  }`}
                >
                  {submenu.name}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={menu.path || "#"}
          className={`flex items-center p-4 hover:bg-gray-700 ${
            router.pathname === menu.path ? "bg-gray-700" : ""
          }`}
        >
          <span className="ml-3">{menu.name}</span>
        </Link>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
        <div className="flex-1 flex justify-center items-center">
          <p>Loading menus...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
        <div className="flex-1 flex justify-center items-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
      <nav className="flex-1 overflow-y-auto">
        {menus.map((menu) => renderMenu(menu))}
      </nav>
    </div>
  );
};

export default Sidebar;
