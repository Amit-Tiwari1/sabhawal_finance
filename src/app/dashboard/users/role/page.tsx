"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
  Spinner,
  Checkbox,
  Card,
} from "@nextui-org/react";
import { getAllMenus } from "@/services/menuService";

export default function App() {
  const [openAddNewUser, setAddNewUser] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [roleName, setRoleName] = useState("");
  const [positionName, setPositionName] = useState("");

  useEffect(() => {
    const fetchAllMenus = async () => {
      setLoading(true);
      try {
        const response = await getAllMenus();
        setMenus(response.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMenus();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedMenus((prev) =>
      prev.has(id)
        ? new Set([...prev].filter((menuId) => menuId !== id))
        : new Set(prev.add(id))
    );
  };

  const handleSaveRole = () => {
    console.log("Role Name:", roleName);
    console.log("Position Name:", positionName);
    console.log("Selected Menus:", [...selectedMenus]);
    setAddNewUser(false);
  };

  const handleSubmenuCheckboxChange = (parentId, submenuId) => {
    const submenuKey = `${parentId}-${submenuId}`;
    setSelectedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(submenuKey)) {
        newSet.delete(submenuKey);
      } else {
        newSet.add(submenuKey);
      }
      return newSet;
    });
  };

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
        <Table aria-label="Example table with custom cells">
          <TableHeader>
            <TableColumn>Menu Name</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody items={menus}>
            {(item) => (
              <TableRow key={item.MenuId}>
                <TableCell>{item.MenuName}</TableCell>
                <TableCell>Actions here</TableCell>
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
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
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
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    size="sm"
                  />
                  <Input
                    label="Position Name"
                    placeholder="Position name (e.g., Section Officer)"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    size="sm"
                  />
                  <Checkbox required>Active</Checkbox>
                  <Checkbox>Deactivate</Checkbox>
                </div>
                {/* parent menus section */}
                <div className="w-1/2 bg-slate-500 max-h-12 flex justify-center items-center">
                  <h1>test</h1>
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
