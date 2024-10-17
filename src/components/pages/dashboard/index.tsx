import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { MagicCard } from "@/components/ui/magic-card";
import InputDialog from "@/components/container/InputDialog";
import { TableDemo } from "@/components/container/TableList";
import { SelectDemo } from "@/components/container/Select";
import {
  FaMoneyBill,
  FaMoneyBillTransfer,
  FaDoorClosed,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Komponen sudah "mounted" di client
  }, []);

  if (!mounted) {
    return null; // Hindari render di server-side hingga theme siap
  }

  // const appliedTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="max-w-[800px] min-h-screen mx-auto bg-gray-100 p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Hi Syahridho</h1>
          <h1 className="text-base tracking-tight mb-4 text-slate-400">
            Saldo anda
          </h1>
        </div>
        <Button variant="outline" className="!p-3">
          <FaDoorClosed />
        </Button>
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-center">
        Rp. 1.000.000
      </h1>
      <div className="flex justify-between gap-4 mb-6">
        <div
          className="w-1/2 h-[110px] p-4 border border-input bg-background shadow-sm hover:bg-accent
      hover:text-accent-foreground flex flex-col justify-between"
        >
          <div className="">
            <div className="flex items-center gap-2">
              <FaMoneyBill />
              <span className="text-xs">Pemasukan</span>
            </div>
            <h1 className="text-lg font-semibold mt-1">Rp.10.000</h1>
          </div>
          <h5 className="text-xs text-slate-400 underline">
            1 transaksi hari ini
          </h5>
        </div>
        <div
          className="w-1/2 h-[110px] p-4 border border-input bg-background shadow-sm hover:bg-accent
      hover:text-accent-foreground flex flex-col justify-between"
        >
          <div className="">
            <div className="flex items-center gap-2">
              <FaMoneyBillTransfer />
              <span className="text-xs">Pengeluaran</span>
            </div>
            <h1 className="text-lg font-semibold mt-1">Rp.100.000</h1>
          </div>
          <h5 className="text-xs text-slate-400 underline">
            1 transaksi hari ini
          </h5>
        </div>
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
