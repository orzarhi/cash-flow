import { buttonVariants } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const data = [
    {
      id: 1,
      supplier: 'INV001',
      paid: 3000,
      amount: 5000,
      remaining: 2000,
    },
    {
      id: 2,
      supplier: 'INV002',
      paid: 2000,
      amount: 4000,
      remaining: 2000,
    },
    {
      id: 3,
      supplier: 'INV003',
      paid: 1000,
      amount: 3000,
      remaining: 2000,
    },
    {
      id: 4,
      supplier: 'INV004',
      paid: 4000,
      amount: 6000,
      remaining: 2000,
    },
    {
      id: 5,
      supplier: 'INV005',
      paid: 5000,
      amount: 7000,
      remaining: 2000,
    },
  ];

  return (
    <main className="min-h-screen space-y-8 mt-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-center">ההוצאות שלי</h1>
        <Link
          href="/expense/create"
          className={buttonVariants({
            className: 'inline-flex gap-2',
            variant: 'ghost',
          })}
        >
          <CirclePlus className="size-5" />
          הוצאה חדשה
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-right">ספק</TableHead>
            <TableHead className="text-right">שולם</TableHead>
            <TableHead className="text-right">סכום</TableHead>
            <TableHead className="text-right">נשאר</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.supplier}</TableCell>
              <TableCell >{row.paid}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell className='text-right'>{row.remaining}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
