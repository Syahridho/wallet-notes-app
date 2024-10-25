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

export function TableList({ transactions, userId }: any) {
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
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{convertIDR(transaction.total)}</TableCell>
              <TableCell>{convertHour(transaction.date)} WIB</TableCell>
              <TableCell className="text-right">
                <ComboBox userId={userId} id={transaction.id} />
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
