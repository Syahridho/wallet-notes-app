import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { MagicCard } from "@/components/ui/magic-card";
import InputDialog from "@/components/container/InputDialog";
import { TableDemo } from "@/components/container/TableList";
import { SelectDemo } from "@/components/container/Select";
import { FaDoorClosed, FaMoneyBill } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { CardDashboard } from "@/components/container/cardDashboard";
import transactionServices from "@/services/transaction";

const Dashboard = () => {
  const { data }: any = useSession();
  const [mounted, setMounted] = useState(false);

  // const appliedTheme = theme === "system" ? systemTheme : theme;
  const getAll = async () => {
    const response = await transactionServices.getProfile();
    console.log(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAll();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setMounted(true); // Komponen sudah "mounted" di client
  }, []);

  if (!mounted) {
    return null; // Hindari render di server-side hingga theme siap
  }

  return (
    <div className="max-w-[800px] min-h-screen mx-auto p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Hi{" "}
            {data ? data?.user.name || data?.user.fullname : data?.user.email}
          </h1>
          <h1 className="text-base tracking-tight mb-4 text-slate-400">
            Saldo anda
          </h1>
        </div>
        <Button variant="outline" className="!p-3" onClick={() => signOut()}>
          <FaDoorClosed />
        </Button>
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-center">
        Rp. 1.000.000
      </h1>
      <div className="flex justify-between gap-4 mb-6">
        <CardDashboard Icons={FaMoneyBill} title={"Pemasukan"} transaction={3}>
          Rp.1.000.000
        </CardDashboard>
        <CardDashboard Icons={FaMoneyBill} title={"Pemasukan"} transaction={3}>
          Rp.1.000.000
        </CardDashboard>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">Transaksi</h1>

        <div className="flex gap-2">
          <InputDialog
            title="Tambahkan Uang"
            subTitle="Silahkan isi untuk menambahkan uang."
            onSubmit={() => console.log("tes")}
          >
            Pemasukan
          </InputDialog>
          <InputDialog
            title="Tambahkan Uang"
            subTitle="Silahkan isi untuk menambahkan uang."
            onSubmit={() => console.log("tes")}
          >
            Pengeluaran
          </InputDialog>
        </div>
      </div>
      <div>
        <SelectDemo />
      </div>
      <TableDemo />
    </div>
  );
};

export default Dashboard;
