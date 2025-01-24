"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { IoMdPhotos } from "react-icons/io";
import useNotifications from "@/components/useNotification";
import { signupUser, SignupData } from "@/services/userService";
import Image from "next/image";

const SignupPage = () => {
  const { notifySuccess, notifyError } = useNotifications();

  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({

    username: "",
    fullName:"",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
      const response = await signupUser(formPayload);
  
      if (response) {
        notifySuccess("Signup successful! Please wait for admin verification.");
        setFormData({
          username: "",
          fullName:"",
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
      }
    } catch (error: any) {
      notifyError(error.message);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600 mt-14 p-4 sm:p-10">
      <div className="w-full sm:w-4/5 lg:w-3/5 bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
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
            <Input
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              fullWidth
            />
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
          <Button type="submit" color="primary" fullWidth className="mt-4">
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
