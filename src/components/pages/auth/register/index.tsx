import InputForm from "@/components/container/InputForm";
import FormAuth from "@/components/layout/FormAuth";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Register = () => {
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
    <FormAuth
      onSubmit={handleSubmit}
      title="Register Account"
      subTitle="create in here"
      error={error}
      success={success}
    >
      <InputForm type="text" name="fullname" title="Full Name" />
      <InputForm type="email" name="email" title="Email" />
      <InputForm type="password" name="password" title="Password" />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </Button>
    </FormAuth>
  );
};

export default Register;
