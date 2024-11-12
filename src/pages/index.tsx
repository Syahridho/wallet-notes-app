import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/pages/dashboard";
import { FaCircleNotch } from "react-icons/fa6";
import Head from "next/head";

export default function Home() {
  const { data: session, status } = useSession() as {
    data: any;
    status: any;
  };

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <div className="min-h-screen flex justify-center items-center">
          <FaCircleNotch className="animate-spin text-slate-900/30 w-16 h-16" />
        </div>
      </>
    );
  }

  if (status === "authenticated" && session) {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Button onClick={() => signIn()} className="mb-4">
          Sign In
        </Button>

        {session?.user?.fullname && (
          <h1 className="text-lg font-semibold">{session.user.fullname}</h1>
        )}
      </div>
    </>
  );
}
