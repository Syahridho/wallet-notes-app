import InputForm from "@/components/container/InputForm";
import FormAuth from "@/components/layout/FormAuth";
import Button from "@/components/ui/Button";
import Link from "next/link";

type PropsTypes = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string;
};

const Login = (props: PropsTypes) => {
  const { onSubmit, isLoading, error } = props;
  return (
    <FormAuth
      onSubmit={onSubmit}
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
