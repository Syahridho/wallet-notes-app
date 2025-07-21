import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ComboBox from "@/components/container/ComboBox";
import { convertHour } from "@/utils/convertDate";
import { convertIDR } from "@/utils/currency";

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export function TableList({
  transactions,
  idUser,
  handleDelete,
  handleUpdate,
}: any) {
  return (
    <Table>
      <TableCaption>2024@wallet notes app</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.length > 0 ? (
          transactions
            .slice()
            .reverse()
            .map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.type == "deposit" ? (
                    <FaArrowTrendUp className="text-green-500" />
                  ) : (
                    <FaArrowTrendDown className="text-red-500" />
                  )}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{convertIDR(transaction.amount)}</TableCell>
                <TableCell>{convertHour(transaction.createdAt)} WIB</TableCell>
                <TableCell className="text-right">
                  <ComboBox
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    id={transaction.id}
                    idUser={idUser}
                    data={transaction}
                  />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <h1 className="text-center text-slate-600 py-4">Data Kosong</h1>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
