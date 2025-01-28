"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Spinner,
  User,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoMdPhotos } from "react-icons/io";
import useNotifications from "@/components/useNotification";
import { signupUser, SignupData, getAllUsers } from "@/services/userService";
import Image from "next/image";
import { EyeIcon } from "../../../../../public/icons/EyeIcon";
import { EditIcon } from "../../../../../public/icons/EditIcon";
import { DeleteIcon } from "../../../../../public/icons/DeleteIcon";
import { usersColumns } from "@/data/helperData";
import { getAllRoles } from "@/services/menuService";

const SignupPage = () => {
  const { notifySuccess, notifyError } = useNotifications();

  const [openAddNewUser, setAddNewUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allRoles, setAllRoles] = useState([]);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    mobilenumber: "",
    role: "",
    address1: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
    userpic: null as File | null,
    password: "",
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllUsers();

        if (response.success) {
          setAllUsers(response.result);
        } else {
          throw new Error(response.message || "Failed to fetch users");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        notifyError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e is getting ", e.target.value);
    
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg"];
      const maxSizeInMB = 2;

      if (!allowedTypes.includes(file.type)) {
        notifyError("Only JPEG or JPG files are allowed.");
        return;
      }

      if (file.size > maxSizeInMB * 1024 * 1024) {
        notifyError(`File size should not exceed ${maxSizeInMB} MB.`);
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, userpic: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const formPayload: SignupData = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        mobilenumber: formData.mobilenumber,
        role: formData.role,
        address1: formData.address1,
        landmark: formData.landmark || "",
        city: formData.city,
        state: formData.state,
        pin: formData.pin,
        userpic: formData.userpic,
        password: formData.password,
      };
console.log("final form data ", formPayload);

      const response = await signupUser(formPayload);

      if (response.success) {
        notifySuccess("User Added successfully!");

        setFormData({
          username: "",
          fullName: "",
          email: "",
          mobilenumber: "",
          role: "",
          address1: "",
          landmark: "",
          city: "",
          state: "",
          pin: "",
          userpic: null,
          password: "",
        });
        setPreviewImage("");
        setAddNewUser(false);

        const usersResponse = await getAllUsers();
        if (usersResponse.success) {
          setAllUsers(usersResponse.result);
        } else {
          notifyError(usersResponse.message || "Failed to refresh user list");
        }
      } else {
        throw new Error(response.message || "Failed to add user");
      }
    } catch (error: any) {
      notifyError(error.message);
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    switch (columnKey) {
      case "profile":
        return (
          <Image
            src={user.userpic}
            alt="User Profile Picture"
            width={50}
            height={50}
            className="rounded-full"
          />
        );
      case "nameEmail":
        return (
          <div>
            <p className="font-semibold capitalize">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        );
      case "role":
        return (
          <p className="capitalize">{user.role === 0 ? "Admin" : "User"}</p>
        );
      case "mobilenumber":
        return <p>{user.mobilenumber}</p>;
      case "cityAddress":
        return (
          <div>
            <p className="capitalize">{user.city}</p>
            <p className="text-sm text-gray-500">
              {user.address1}, {user.state}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={user.isactive ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.isactive ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
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
        return null;
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Button color="primary" onPress={() => setAddNewUser(true)}>
        Add User
      </Button>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="success" label="Loading..." size="lg" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <div className="mt-10">
          <Table aria-label="User Details Table" isStriped>
            <TableHeader columns={usersColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={allUsers}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      ;
      <Modal isOpen={openAddNewUser} onOpenChange={setAddNewUser} size="3xl">
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold mb-4">
                Add New User
              </ModalHeader>
              <ModalBody>
                <div className="w-full bg-white shadow-md rounded-md p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                        fullWidth
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Mobile Number"
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      {/* <Input
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        fullWidth
                      /> */}
                      <Select
                        name="role"
                        required
                        value={formData.role}
                        className="max-w-xs"
                        items={allRoles}
                        label="Role"
                        placeholder="Select Role"
                        onChange={handleChange}
                        
                      >
                        {(role) => (
                          <SelectItem key={role.roleId} value={role.roleId}>
                            {role.roleName}
                          </SelectItem>
                        )}
                      </Select>

                      <Input
                        label="Address 1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Pin Code"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                      />
                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-28 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                          {previewImage ? (
                            <Image
                              src={previewImage}
                              alt="Preview"
                              className="object-cover w-full h-full"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <IoMdPhotos size={40} className="text-gray-400" />
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/jpeg,image/jpg"
                          onChange={handleImageUpload}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      className="mt-4"
                    >
                      Signup
                    </Button>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignupPage;
