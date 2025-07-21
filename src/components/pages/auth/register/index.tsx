import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const target = e.target as HTMLFormElement;
    const data = {
      fullname: target.fullname.value,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        target.reset();
        setSuccess("Akun berhasil dibuat! Silakan login.");
      } else {
        setError("Email sudah digunakan.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
          <p className="text-sm text-muted-foreground">
            Kelola transaksi kamu dengan mudah.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Gagal Daftar</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default">
                <AlertTitle>Berhasil!</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="fullname">Nama Lengkap</Label>
              <Input
                name="fullname"
                id="fullname"
                placeholder="Nama kamu"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email@domain.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mendaftar..." : "Register"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
