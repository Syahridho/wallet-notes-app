import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data }: any = useSession();
  return (
    <div>
      <div>
        {!data ? (
          <Button onClick={() => signIn()}>signIn</Button>
        ) : (
          <Button variant="destructive" onClick={() => signOut()}>
            LogOut
          </Button>
        )}
        <h1>{data && data?.user.fullname}</h1>
      </div>
    </div>
  );
}
