'use client'
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
 
  Tooltip,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
  Spinner,
  Checkbox,
} from "@nextui-org/react";
import { createNewRole, getAllMenus, getAllRoles } from "@/services/menuService";
import useNotifications from "@/components/useNotification";
import { EditIcon } from "../../../../../public/icons/EditIcon";
import { DeleteIcon } from "../../../../../public/icons/DeleteIcon";
import {roleColumns} from "@/data/helperData"
import moment from "moment";
export default function CreateRolePage() {
  const { notifySuccess, notifyError } = useNotifications();


  const [openAddNewUser, setAddNewUser] = useState(false);
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [positionName, setPositionName] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [menuCounts, setMenuCounts] = useState({});
  const [allRoles, setAllRoles] = useState([]);
  const handleParentClick = (menuId) => {
    console.log(`Parent menu clicked: ${menuId}`);
    setActiveMenu((prevActive) => {
      const newActive = prevActive === menuId ? null : menuId;
      return newActive;
    });
  };

  const handleMainSubmenu = (menuId, status) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
  
      // Update the permissions for the main menu based on the 'status' (checked or unchecked)
      if (status) {
        newPermissions[menuId] = {
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        };
      } else {
        newPermissions[menuId] = {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
        };
      }
  
      // Calculate if all checkboxes are selected for the menu (canCreate, canRead, canUpdate, canDelete)
      const allChecked =
        newPermissions[menuId].canCreate &&
        newPermissions[menuId].canRead &&
        newPermissions[menuId].canUpdate &&
        newPermissions[menuId].canDelete;
  
      // Set the 'isMainChecked' to reflect whether all checkboxes are checked
      newPermissions[menuId].isMainChecked = allChecked;
  
      return newPermissions;
    });
  };
  

  const handleMainSubmenuOperations = (menuId, checkboxType, value) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      if (!newPermissions[menuId]) {
        newPermissions[menuId] = {};
      }
      newPermissions[menuId][checkboxType] = value;

      const allChecked =
        newPermissions[menuId].canCreate &&
        newPermissions[menuId].canRead &&
        newPermissions[menuId].canUpdate &&
        newPermissions[menuId].canDelete;

      newPermissions[menuId].isMainChecked = allChecked;
      
      return newPermissions;
    });
  };

  useEffect(() => {
    const fetchAllMenus = async () => {
      setLoading(true);
      try {
        const response = await getAllMenus();
        setAllMenus(response.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMenus();
  }, []);

  useEffect(() => {
    const fetchAllRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles();
       
        
        setAllRoles(response.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoles();
  }, []);

  const handleSaveRole = async () => {
    const rolePayload = {
      roleName,
      roleDescription: positionName,
      permissions: Object.keys(permissions).map((submenuId) => {
        return {
          menuId: submenuId,
          canCreate: permissions[submenuId]?.canCreate || false,
          canRead: permissions[submenuId]?.canRead || false,
          canUpdate: permissions[submenuId]?.canUpdate || false,
          canDelete: permissions[submenuId]?.canDelete || false,
        };
      }),
    };
  
    try {
      const response = await createNewRole(rolePayload); 
      if(response.status==200){
        notifySuccess(`${response.message}`);
      }
      
  
      setRoleName("");  
      setPositionName(""); 
      setPermissions({}); 
      setActiveMenu(null);
      setMenuCounts({});
  
      setAddNewUser(false); 
  
    } catch (error) {
      notifyError(error.message);
    }
  };

  const renderCell = React.useCallback((role, columnKey) => {
    console.log("role and columnkey is getting ", role, columnKey);
    
    const cellValue = role[columnKey];

    switch (columnKey) {
      case "roleName":
        return (
          <span>{cellValue}</span>
        );
      case "roleDescription":
        return (
                <span>{cellValue}</span>

        );
      case "createdAt":
        return (
          <span>{moment(cellValue).format('ll')}</span>

        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
        
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  
  

  return (
    <>
      <div className="mb-5">
        <Button color="primary" onPress={() => setAddNewUser(true)}>
          Add New Role
        </Button>
      </div>
      <h1 className="text-xl font-bold mb-4">All Roles</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="success" label="Loading..." size="lg" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <Table aria-label="Role Table" isStriped>
      <TableHeader columns={roleColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={allRoles}>
        {(item) => (
          <TableRow key={item.roleId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
      )}

      <Modal
        isOpen={openAddNewUser}
        onOpenChange={setAddNewUser}
        scrollBehavior="inside"
        size="full"
      >
        <ModalContent className="max-w-full max-h-screen">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold mb-4">
                Add New Role/Permissions
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Role Name"
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={(e) => {
                      console.log('Role Name changed:', e.target.value);
                      setRoleName(e.target.value);
                    }}
                    required
                    size="sm"
                  />
                  <Input
                    label="Position Name"
                    placeholder="Position name (e.g., Section Officer)"
                    value={positionName}
                    onChange={(e) => {
                      console.log('Position Name changed:', e.target.value);
                      setPositionName(e.target.value);
                    }}
                    size="sm"
                  />
                </div>

                <div className="menu-container flex flex-wrap gap-4 p-4 bg-gray-800 rounded-sm">
                  {allMenus.map((menu) => (
                    <div key={menu.MenuId} className="menu-item mb-4 w-auto bg-red-300">
                      <div
                        className="flex items-center p-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handleParentClick(menu.MenuId)}
                      >
                        <span>{menu.MenuName}</span>
                        <div className="ml-2 bg-[#f29d13] text-white w-6 h-6 text-center rounded-full">
                          {menuCounts[menu.MenuId] || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 flex-wrap justify-center submenu-container mt-6 p-4 bg-gray-50 rounded-md">
                  {activeMenu &&
                    allMenus
                      .find((menu) => menu.MenuId === activeMenu)
                      ?.Submenus.map((submenu) => (
                        <div
                          key={submenu.MenuId}
                          className="relative group w-full md:w-1/3"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                          <div className="relative px-2 py-1 bg-white ring-1 ring-gray-900/5 rounded-lg shadow-md leading-none space-y-4">
                            <h2 className="text-lg font-semibold text-white bg-[#192538] p-1 rounded">
                              <Checkbox
                                isSelected={permissions[submenu.MenuId]?.isMainChecked || false}
                                onChange={(e) => {
                                  handleMainSubmenu(submenu.MenuId, e.target.checked);
                                }}
                              />
                              {submenu.MenuName}
                            </h2>
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canRead || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canRead", e.target.checked);
                                  }}
                                />
                                <span> canRead</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canCreate || false}
                                  onChange={(e) => {
                                    handleMainSubmenuOperations(submenu.MenuId, "canCreate", e.target.checked);
                                  }}
                                />
                                <span>canCreate</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canUpdate || false}
                                  onChange={(e) => {
                                    console.log(`canUpdate checkbox for submenu: ${submenu.MenuName}, checked: ${e.target.checked}`);
                                    handleMainSubmenuOperations(submenu.MenuId, "canUpdate", e.target.checked);
                                  }}
                                />
                                <span>canUpdate</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <Checkbox
                                  isSelected={permissions[submenu.MenuId]?.canDelete || false}
                                  onChange={(e) => {
                                    console.log(`canDelete checkbox for submenu: ${submenu.MenuName}, checked: ${e.target.checked}`);
                                    handleMainSubmenuOperations(submenu.MenuId, "canDelete", e.target.checked);
                                  }}
                                />
                                <span>canDelete</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSaveRole}>
                  Save
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
