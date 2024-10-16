import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

type PropsTypes = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  subTitle: string;
  error: string;
  success?: string;
};

const FormAuth = (props: PropsTypes) => {
  const { children, onSubmit, title, subTitle, error, success } = props;

  const { pathname, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  return (
    <div className="min-w-screen min-h-screen max-w-[500px] mx-auto">
      <div className="p-4">
        <div className="my-8">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p>{subTitle}</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {children}
        </form>
        {error && <h1 className=" text-red-500">{error}</h1>}
        {success && <h1 className=" text-green-500">{success}</h1>}

        {pathname === "/auth/login" ? (
          <h1 className="text-center my-4">
            No have account?{" "}
            <Link
              href="/auth/register"
              className="underline text-blue-800 italic"
            >
              Register
            </Link>
          </h1>
        ) : (
          <h1 className="text-center my-4">
            Already have account?{" "}
            <Link href="/auth/login" className="underline text-blue-800 italic">
              Login
            </Link>
          </h1>
        )}
        <div className="flex items-center justify-center gap-4 my-8">
          <hr className="w-1/2" />
          <span className="text-slate-400">or</span>
          <hr className="w-1/2" />
        </div>
        <div>
          <button
            className="w-full flex justify-center items-center p-2 gap-2 border rounded bg-slate-100 font-medium text-slate-600"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
          >
            <FcGoogle />
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAuth;
