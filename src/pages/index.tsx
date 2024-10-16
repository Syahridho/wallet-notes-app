import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data }: any = useSession();
  console.log(data);
  return (
    <div>
      <div>
        {data ? (
          <button onClick={() => signOut()}>LogOut</button>
        ) : (
          <button onClick={() => signIn()}>signIn</button>
        )}
        <h1>{data && data?.user.fullname}</h1>
      </div>
    </div>
  );
}
