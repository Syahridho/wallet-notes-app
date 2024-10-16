import Login from "@/components/pages/auth/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPages = () => {
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
        push(callbackUrl);
        setIsLoading(false);
        setError("");
      } else {
        setIsLoading(false);
        setError("Email or Password incorret");
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setError("Email or Password incorret");
    }
  };
  return <Login onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
};

export default LoginPages;
