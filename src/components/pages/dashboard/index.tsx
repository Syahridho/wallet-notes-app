import { useEffect, useState, useMemo, useCallback } from "react";
import InputDialog from "@/components/container/InputDialog";
import NumberTicker from "@/components/ui/number-ticker";
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
import {
  getLastMonthDeposits,
  getThisMonthDeposits,
  getThisWeekDeposits,
  getTodayIncomeTransactions,
} from "@/utils/filterDate";

const Dashboard = () => {
  const { data: sessionData } = useSession();
  const [mounted, setMounted] = useState(false);
  const [select, setSelect] = useState("today");
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Semua hooks dipindahkan ke level atas
  const filteredTransactions = useMemo(() => {
    if (!transaction?.transaction) return [];

    const filters = {
      today: () => getTodayIncomeTransactions(transaction.transaction),
      last_week: () => getThisWeekDeposits(transaction.transaction),
      this_month: () => getThisMonthDeposits(transaction.transaction),
      last_month: () => getLastMonthDeposits(transaction.transaction),
    };

    return filters[select]?.() || [];
  }, [transaction, select]);

  const { totalIncome, totalOutcome, todayDepositCount, todayWithdrawCount } =
    useMemo(() => {
      if (!transaction?.transaction) {
        return {
          totalIncome: 0,
          totalOutcome: 0,
          todayDepositCount: 0,
          todayWithdrawCount: 0,
        };
      }

      const deposits = getTodayIncomeTransactions(
        transaction.transaction,
        "deposit"
      );
      const withdraws = getTodayIncomeTransactions(
        transaction.transaction,
        "withdraw"
      );

      return {
        totalIncome: transaction.transaction
          .filter((item) => item.type === "deposit")
          .reduce((acc, item) => acc + item.amount, 0),
        totalOutcome: transaction.transaction
          .filter((item) => item.type === "withdraw")
          .reduce((acc, item) => acc + item.amount, 0),
        todayDepositCount: deposits.length,
        todayWithdrawCount: withdraws.length,
      };
    }, [transaction]);

  const getAllTransaction = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await transactionServices.getTransaction();
      setTransaction(response.data.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTransaction = useCallback(
    async (e, type) => {
      try {
        const response = await transactionServices.postTransaction({
          ...e,
          type,
        });

        if (response.status === 200) {
          await getAllTransaction();
        }
      } catch (error) {
        console.error(`Failed to ${type} transaction:`, error);
      }
    },
    [getAllTransaction]
  );

  const handleDelete = useCallback(
    async (id, idUser) => {
      try {
        const result = await transactionServices.deleteTransaction(idUser, id);
        if (result.status === 200) {
          await getAllTransaction();
        }
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    },
    [getAllTransaction]
  );

  const handleUpdate = useCallback(
    async (datas) => {
      try {
        const response = await transactionServices.putTransaction(
          datas,
          sessionData?.user?.id,
          datas.id
        );
        if (response.status === 200) {
          await getAllTransaction();
        }
      } catch (error) {
        console.error("Failed to update transaction:", error);
      }
    },
    [getAllTransaction, sessionData?.user?.id]
  );

  useEffect(() => {
    const initializeData = async () => {
      await getAllTransaction();
      setMounted(true);
    };

    initializeData();
  }, [getAllTransaction]);

  if (!mounted) return null;

  return (
    <div className="max-w-[800px] min-h-screen mx-auto p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Hi{" "}
            {sessionData?.user?.name ||
              sessionData?.user?.fullname ||
              sessionData?.user?.email}
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
        Rp.{" "}
        {transaction?.balance !== 0 ? (
          <NumberTicker value={transaction?.balance || 0} />
        ) : (
          0
        )}
      </h1>

      <div className="flex justify-between gap-4 mb-6">
        <CardDashboard
          Icons={FaMoneyBillTrendUp}
          title="Pemasukan"
          transaction={todayDepositCount}
        >
          Rp. {totalIncome > 0 ? <NumberTicker value={totalIncome} /> : 0}
        </CardDashboard>

        <CardDashboard
          Icons={FaMoneyBillTransfer}
          title="Pengeluaran"
          transaction={todayWithdrawCount}
        >
          Rp. {totalOutcome > 0 ? <NumberTicker value={totalOutcome} /> : 0}
        </CardDashboard>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">Transaksi</h1>

        <div className="flex gap-2">
          <InputDialog
            title="Penambahan Uang"
            subTitle="Silahkan isi untuk menambahkan uang."
            onSubmit={(e) => handleTransaction(e, "deposit")}
          >
            Pemasukan
          </InputDialog>
          <InputDialog
            title="Pengurangan Uang"
            subTitle="Silahkan isi untuk Pengurangan uang."
            onSubmit={(e) => handleTransaction(e, "withdraw")}
          >
            Pengeluaran
          </InputDialog>
        </div>
      </div>

      <div className="mb-4">
        <SelectDemo setSelect={setSelect} select={select} />
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <TableList
          transactions={filteredTransactions}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          idUser={transaction?.id}
        />
      )}
    </div>
  );
};

export default Dashboard;
