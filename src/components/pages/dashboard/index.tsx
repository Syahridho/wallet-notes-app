import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { MagicCard } from "@/components/ui/magic-card";
import InputDialog from "@/components/container/InputDialog";
import { TableList } from "@/components/container/TableList";
import { SelectDemo } from "@/components/container/Select";
import {
  FaDoorClosed,
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { CardDashboard } from "@/components/container/cardDashboard";
import transactionServices from "@/services/transaction";
import NumberTicker from "@/components/ui/number-ticker";

const Dashboard = () => {
  const { data }: any = useSession();
  const [mounted, setMounted] = useState(false);
  const [transaction, setTransaction] = useState<any>();

  // const appliedTheme = theme === "system" ? systemTheme : theme;
  const getAllTrasaction = async () => {
    const response = await transactionServices.getTransaction();

    setTransaction(response.data.data);
  };

  const countIncome = transaction?.transaction
    ? transaction.transaction.filter((item) => item.status === true).length
    : 0;

  const countOutcome = transaction?.transaction
    ? transaction.transaction.filter((item) => item.status === false).length
    : 0;

  const totalIncome = transaction?.transaction
    ? transaction.transaction
        .filter((item) => item.status === true)
        .reduce((acc, item) => acc + item.total, 0)
    : 0;

  const totalOutcome = transaction?.transaction
    ? transaction.transaction
        .filter((item) => item.status === false)
        .reduce((acc, item) => acc + item.total, 0)
    : 0;

  const handleIncome = async (e: any) => {
    const currentBalance = transaction?.balance ?? 0;

    const datas = {
      ...e,
      status: true,
      idUser: data.user.id,
      balanceOld: currentBalance,
    };

    // console.log(datas);

    const response = await transactionServices.postTransaction(datas);

    if (response.status === 200) {
      console.log("berhasil");
      getAllTrasaction();
    } else {
      console.log("gagal");
    }
  };

  const handleOutcome = async (e: any) => {
    const currentBalance = transaction?.balance ?? 0;

    const datas = {
      ...e,
      status: false,
      idUser: data.user.id,
      balanceOld: currentBalance,
    };

    // console.log(datas);

    const response = await transactionServices.postTransaction(datas);

    if (response.status === 200) {
      console.log("berhasil");
      getAllTrasaction();
    } else {
      console.log("gagal");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTrasaction();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
        Rp. <NumberTicker value={transaction ? transaction?.balance : 0} />
      </h1>
      <div className="flex justify-between gap-4 mb-6">
        <CardDashboard
          Icons={FaMoneyBillTrendUp}
          title={"Pemasukan"}
          transaction={countIncome}
        >
          Rp. <NumberTicker value={transaction ? totalIncome : 0} />
        </CardDashboard>
        <CardDashboard
          Icons={FaMoneyBillTransfer}
          title={"Pengeluaran"}
          transaction={countOutcome}
        >
          Rp. <NumberTicker value={transaction ? totalOutcome : 0} />
        </CardDashboard>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">Transaksi</h1>

        <div className="flex gap-2">
          <InputDialog
            title="Penambahan Uang"
            subTitle="Silahkan isi untuk menambahkan uang."
            onSubmit={handleIncome}
          >
            Pemasukan
          </InputDialog>
          <InputDialog
            title="Pengurangan Uang"
            subTitle="Silahkan isi untuk Pengurangan uang."
            onSubmit={handleOutcome}
          >
            Pengeluaran
          </InputDialog>
        </div>
      </div>
      <div>
        <SelectDemo />
      </div>
      <TableList
        transactions={transaction ? transaction.transaction : null}
        userId={transaction ? transaction.id : 0}
      />
    </div>
  );
};

export default Dashboard;
