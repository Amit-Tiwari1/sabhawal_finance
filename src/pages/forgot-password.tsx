import React, { useState } from "react";
import { Button, Input, Form } from "@nextui-org/react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = (e:any) => {
    e.preventDefault();
    // Handle the password reset logic (e.g., send an email)
    alert("Password reset link sent!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
        <Form onSubmit={handleResetPassword}>
          <Input
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            isRequired
          />
          <Button type="submit" color="primary" className="w-full mt-4">
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}
