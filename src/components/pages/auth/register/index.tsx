import InputForm from "@/components/container/InputForm";
import FormAuth from "@/components/layout/FormAuth";
import Button from "@/components/ui/Button";
import React from "react";

type PropsTypes = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string;
  success: string;
};

const Register = (props: PropsTypes) => {
  const { onSubmit, isLoading, error, success } = props;
  return (
    <FormAuth
      onSubmit={onSubmit}
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
