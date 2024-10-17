import InputForm from "@/components/container/InputForm";
import FormAuth from "@/components/layout/FormAuth";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const { push, query } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const target = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: target.email.value,
        password: target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        push(callbackUrl || "/");
        setError("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Email or Password incorret");
      }
    } catch (error) {
      console.log(error);
      setError("Email or Password incorret");
      setIsLoading(false);
    }
  };
  return (
    <FormAuth
      onSubmit={handleSubmit}
      title="Login Account"
      subTitle="in here"
      error={error}
    >
      <InputForm type="email" name="email" title="Email" />
      <InputForm type="password" name="password" title="Password" />
      <Link
        href="/auth/forget"
        className="text-right underline text-blue-800 italic"
      >
        Forget Password
      </Link>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </FormAuth>
  );
};

export default Login;
