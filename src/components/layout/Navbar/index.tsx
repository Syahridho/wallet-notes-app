import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div>
      <div>
        {data ? (
          <button onClick={() => signOut()}>LogOut</button>
        ) : (
          <button onClick={() => signIn()}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
