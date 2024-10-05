import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { CirclePlus, Ghost } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const expenses = await db.expense.findMany();

  if (!expenses.length) {
    return (
      <main className="min-h-screen space-y-12 mt-8">
        <div className="flex justify-end">
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

        <div className="flex flex-col items-center gap-2 mt-16">
  <Ghost className="size-8 text-muted-foreground" />
  <h3 className="text-xl font-semibold">אין כרגע הוצאות במערכת.</h3>
  <p className="text-gray-500">כאשר יתווספו הוצאות חדשות, הן יופיעו כאן.</p>
</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 mt-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-center">
          ההוצאות שלי ({expenses.length})
        </h1>
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
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.supplierName}</TableCell>
              <TableCell>{expense.deposit}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell className="text-right">{expense.remaining}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
