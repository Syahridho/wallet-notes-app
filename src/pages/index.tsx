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
        <title>Wallet Notes | Catat Transaksi Mudah</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-slate-100 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a]">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Wallet Notes
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-6">
          Aplikasi pencatat keuangan untuk memantau aktivitas{" "}
          <strong>deposit</strong> dan <strong>withdraw</strong> kamu dengan
          mudah.
        </p>

        {!session?.user ? (
          <Button onClick={() => signIn()} size="lg">
            Masuk
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-base text-foreground">
              Selamat datang kembali,{" "}
              <span className="font-medium">{session.user.name}</span>!
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Lanjut ke Dashboard
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
