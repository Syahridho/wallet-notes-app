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

export function TableList({ transactions, idUser, handleDelete }: any) {
  return (
    <Table>
      <TableCaption>2024@wallet notes app</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions ? (
          transactions.reverse().map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{convertIDR(transaction.amount)}</TableCell>
              <TableCell>{convertHour(transaction.createdAt)} WIB</TableCell>
              <TableCell className="text-right">
                <ComboBox
                  handleDelete={handleDelete}
                  id={transaction.id}
                  idUser={idUser}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <h1>kosong</h1>
        )}
      </TableBody>
    </Table>
  );
}
