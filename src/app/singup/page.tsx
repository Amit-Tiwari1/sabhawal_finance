"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { IoMdPhotos } from "react-icons/io";
import useNotifications from "@/components/useNotification";
import { signupUser, SignupData } from "@/services/userService";
import Image from "next/image";

const UserPage = () => {
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
   <h1>test</h1>
  );
};

export default UserPage;
