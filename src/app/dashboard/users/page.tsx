"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
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
  User,
  cn,
} from "@nextui-org/react";
import { DeleteIcon } from "../../../../public/icons/DeleteIcon";
import { EyeIcon } from "../../../../public/icons/EyeIcon";
import { EditIcon } from "../../../../public/icons/EditIcon";
import { UserIcon } from "../../../../public/icons/UserIcon";
import { IoMdPhotos } from "react-icons/io";
import { getAllUsers } from "@/services/userService";
import Image from "next/image";
import { userTableColumns } from "@/utils/nextuiUtilsFile";
import Users from "@/utils/userInterfaces";
import {
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
const menusIcons = [
  { name: "Dashboard", icon: <FaTachometerAlt /> },
  {
    name: "Clients",
    icon: <FaUsers />,
  },
  {
    name: "User Management",
    icon: <FaUserShield />,
  },
  {
    name: "Reports",
    icon: <TbReportAnalytics />,
  },
  {
    name: "Others",
    icon: <FaUserShield />,
    submenus: [
      { name: "Check Civil Score", path: "#" },
      { name: "Calculate EMI", path: "" },
      { name: "Launch New Schemes", path: "" },
    ],
  },
  {
    name: "Settings",
    icon: <FaCog />,
  },
  {
    name: "Logout",
    icon: <FaSignOutAlt />,
  },
];

export default function App() {
  const [openAddNewUser, setAddNewUser] = useState(false);
  const [openMenuModel, setopenMenuModel] = useState(false);
  const [openUserDetailsModel, setopenUserDetailsModel] = useState(false);
  const [openUserDeleteConsent, setopenUserDeleteConsent] = useState(false);
  const [openUserEditModel, setopenUserEditModel] = useState(false);

  console.log("open menumodel status:- ", openMenuModel);
  console.log("open openAddNewUser status:- ", openAddNewUser);

  const [previewImage, setPreviewImage] = useState("");
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        setUsers(response.result || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center space-x-4">
            <Image
              src={user.userpic || "/path/to/default/image.jpg"}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
              width={48}
              height={48}
            />
            <div>
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        );
      case "role":
        return (
          <p className="text-sm">
            {user.role === "0"
              ? "Super Admin"
              : user.role === "1"
              ? "HR"
              : "User"}
          </p>
        );
      case "status":
        const statusInfo =
          user.isactive == 1
            ? { text: "Active", color: "success" }
            : { text: "Inactive", color: "danger" };

        return (
          <Chip
            className="capitalize"
            color={statusInfo.color as "success" | "danger"}
            size="sm"
            variant="flat"
          >
            {statusInfo.text}
          </Chip>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className="text-sm">{user.mobilenumber}</p>
            <p className="text-xs text-gray-500">{user.city}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => setopenUserDetailsModel(true)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Edit user">
              <span
                className="text-lg text-warning-400 cursor-pointer active:opacity-50"
                onClick={() => setopenUserEditModel(true)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => setopenUserDeleteConsent(true)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Menu access">
              <span
                className="text-lg text-primary cursor-pointer active:opacity-50"
                onClick={() => setopenMenuModel(true)}
              >
                <UserIcon size={24} height={24} width={24} />
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
          Add User
        </Button>
      </div>
      <h1>All Users</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner
            color="success"
            label="Loading..."
            labelColor="foreground"
            size="lg"
          />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p>Error: {error}</p>
        </div>
      ) : (
        <Table aria-label="Example table with custom cells" className="mt-5">
          <TableHeader columns={userTableColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal
        isOpen={openAddNewUser}
        placement="top-center"
        onOpenChange={(open) => setAddNewUser(open)}
        backdrop="blur"
      >
        <ModalContent className="max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Client Name"
                    required
                    placeholder="Enter Client Name"
                  />
                  <Input label="Email" placeholder="Enter mail" />
                  <Input label="Password" placeholder="Create a password" />
                  <Input
                    label="Mobile Number"
                    placeholder="Enter Phone Number"
                  />
                  <Input label="Address 1" placeholder="Enter village/town/" />
                  <Input label="Landmark" placeholder="Enter famous place" />
                  <Input label="City" placeholder="Enter district/city" />
                  <Input label="State" placeholder="Enter state" />
                  <Input
                    label="Pin Code"
                    placeholder="Enter pin code/postal code"
                  />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-28 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <IoMdPhotos size={40} className="text-gray-400" />
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={openMenuModel}
        placement="top-center"
        onOpenChange={(open) => setopenMenuModel(open)}
        backdrop="blur"
      >
        <ModalContent className="max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Give user permissions
              </ModalHeader>
              <ModalBody>
                {menusIcons?.map((menu) => (
                  <div key={menu.id} className="">
                    <Checkbox
                      aria-label={menu.name}
                      isSelected={true}>
                      <div className="w-full flex justify-between gap-2">
                       {menu.icon}
                 {menu.name}
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={openUserDeleteConsent}
        placement="top-center"
        onOpenChange={(open) => setopenUserDeleteConsent(open)}
        backdrop="blur"
      >
        <ModalContent className="max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete User
              </ModalHeader>
              <ModalBody>
                <h1>testing</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openUserDetailsModel}
        placement="top-center"
        onOpenChange={(open) => setopenUserDetailsModel(open)}
        backdrop="blur"
      >
        <ModalContent className="max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Details
              </ModalHeader>
              <ModalBody>
                <h1>testing</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openUserEditModel}
        placement="top-center"
        onOpenChange={(open) => setopenUserEditModel(open)}
        backdrop="blur"
      >
        <ModalContent className="max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User
              </ModalHeader>
              <ModalBody>
                <h1>testing</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
