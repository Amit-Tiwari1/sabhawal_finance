"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Form } from "@nextui-org/react";
import { MailIcon } from "../../../public/icons/MailIcon";
import { EyeIcon } from "../../../public/icons/EyeIcon";
import { loginUser } from "@/services/userService";
import useNotifications from "@/components/useNotification";

export default function Login() {
  const { notifySuccess, notifyError } = useNotifications();
  const router = useRouter();

  const [userIdentifier, setUserIdentifier] = useState<string>(""); // For email or username
  const [password, setPassword] = useState<string>("");
  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Toggle for password visibility

  const validateIdentifier = (identifier: string): string | null => {
    // Allow username or email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return identifier.trim() !== "" && (emailRegex.test(identifier) || identifier.length >= 4)
      ? null
      : "Please enter a valid username or email.";
  };

  const validatePassword = (password: string): string[] => {
    const validationErrors: string[] = [];
    if (password.length < 4) {
      validationErrors.push("Password must be 4 characters or more.");
    }
    if (!/[A-Z]/.test(password)) {
      validationErrors.push("Password must include at least 1 uppercase letter.");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      validationErrors.push("Password must include at least 1 symbol.");
    }
    return validationErrors;
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserIdentifier(value);
    setIdentifierError(validateIdentifier(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    setIdentifierError(validateIdentifier(userIdentifier));
    // const validationErrors = validatePassword(password);
    // setPasswordErrors(validationErrors);

    // if (identifierError || validationErrors.length > 0) {
    //   return;
    // }

    setLoading(true);

    try {
      const data = { email: userIdentifier, password };
      const response = await loginUser(data);

      if (response) {
        notifySuccess("Login successful.");
        setUserIdentifier("");
        setPassword("");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      notifyError(error.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <Form className="w-full items-stretch" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Username or Email"
              name="userIdentifier"
              placeholder="Enter your username or email"
              value={userIdentifier}
              onChange={handleIdentifierChange}
              className="w-full"
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            {identifierError && <p className="text-red-500 text-sm mt-1">{identifierError}</p>}
          </div>
          <div className="mb-4 relative">
            <Input
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-full"
              endContent={
                <EyeIcon
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-2xl text-default-400 flex-shrink-0"
                />
              }
            />
            {passwordErrors.length > 0 && (
              <ul className="text-red-500 text-sm mt-1">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          <Button color="primary" type="submit" className="w-full" isLoading={loading}>
            {loading ? "Logging in..." : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
