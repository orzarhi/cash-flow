import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { formatPrice } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CirclePlus, Ghost } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const expenses = await db.expense.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      supplierName: true,
      amount: true,
      deposit: true,
      remaining: true,
      totalMilestonePayment: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log("🚀 ~ Page ~ expenses:", expenses)
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


  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);


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
          <CirclePlus className="size-5 shrink-0" />
          הוצאה חדשה
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">שם</TableHead>
            <TableHead className="text-right">סכום כולל</TableHead>
            <TableHead className="text-right">מקדמה</TableHead>
            <TableHead className="text-right">מפרעות</TableHead>
            <TableHead className="text-right">יתרה</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Link href={`/expense/${expense.id}`}>{expense.supplierName}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/expense/${expense.id}`}>{formatPrice(expense.amount)}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/expense/${expense.id}`}>
                  {formatPrice(expense.deposit ?? 0)}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/expense/${expense.id}`}>
                  {formatPrice(expense.totalMilestonePayment ?? 0)}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/expense/${expense.id}`}>
                  {formatPrice(expense.remaining ?? 0)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>סה״כ הוצאות</TableCell>
            <TableCell className="text-red-500">{formatPrice(totalExpenses)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
