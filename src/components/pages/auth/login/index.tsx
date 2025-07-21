import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const target = e.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        push(callbackUrl);
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Masuk ke Akun</CardTitle>
          <p className="text-sm text-muted-foreground">
            Kelola catatan keuanganmu dengan mudah
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Login Gagal</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="text-right">
              <Link
                href="/auth/forget"
                className="text-sm underline text-blue-600 dark:text-blue-400"
              >
                Lupa password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Masuk..." : "Login"}
            </Button>
          </form>
          <Button
            variant="outline"
            onClick={() => signIn("google")}
            className="w-full mt-4"
          >
            Login dengan Google
          </Button>
          <p className="text-center mt-4 text-sm">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="underline text-blue-600">
              daftar sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
