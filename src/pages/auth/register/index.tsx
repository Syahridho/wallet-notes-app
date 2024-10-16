import Register from "@/components/pages/auth/register";
import React, { useState } from "react";

const RegisterPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    const target = event.target as HTMLFormElement;

    const data = {
      fullname: target.fullname.value,
      email: target.email.value,
      password: target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      target.reset();
      setIsLoading(false);
      setError("");
      setSuccess("Account ready to use");
    } else {
      setIsLoading(false);
      setSuccess("");
      setError("Email already use!");
    }
  };

  return (
    <Register
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
};

export default RegisterPages;
