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

const invoices = [
  {
    paymentMethod: "Bayar Makan",
    paymentStatus: "income",
    totalAmount: "40000",
    date: "19:12 12 Mei 2023",
  },
  {
    paymentMethod: "Bayar Makan",
    paymentStatus: "income",
    totalAmount: "40000",
    date: "19:12 12 Mei 2023",
  },
  {
    paymentMethod: "Bayar Makan",
    paymentStatus: "income",
    totalAmount: "40000",
    date: "19:12 12 Mei 2023",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>2024@wallet notes app</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell className="text-right">
              <ComboBox />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
