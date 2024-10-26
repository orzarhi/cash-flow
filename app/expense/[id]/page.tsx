import { buttonVariants } from '@/components/ui/button';
import { db } from '@/db';
import { cn, formatPrice } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DropdownOptions } from './dropdown-options';
import { CollapsibleDescription } from './collapsible-description';
import { MilestonePaymentMoreDetails } from '@/app/milestone-payment/[id]/milestone-payment-more-details';
import { Suspense } from 'react';
import { SkeletonLoading } from './skeleton-loading';
interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <GetData id={params.id} />
    </Suspense>
  );
}

const GetData = async ({ id }: { id: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const expense = await db.expense.findFirst({
    where: {
      userId: user.id,
      id,
    },
    select: {
      id: true,
      supplierName: true,
      phoneNumber: true,
      profession: true,
      deposit: true,
      remaining: true,
      milestonePayment: true,
      totalMilestonePayment: true,
      amount: true,
      workProgress: true,
      description: true,
      createdAt: true,
    },
  });

  if (!expense) {
    return notFound();
  }

  return (
    <main className="min-h-screen space-y-10 sm:p-8">
      <div className="flex justify-between p-4 mt-2 sm:p-0 sm:mt-0 mb-4">
        <h1 className="text-2xl font-semibold text-center ">פרטי ההוצאה</h1>
        <DropdownOptions expenseId={expense.id} />
      </div>

      <div className="w-full rounded-lg p-4 dark:shadow-zinc-400/5 shadow-sm space-y-4">
        <div className="flex justify-between">
          <h2>שם הספק:</h2>
          <p>{expense.supplierName}</p>
        </div>

        <div className="flex justify-between">
          <h2>מספר טלפון:</h2>
          <p>{expense.phoneNumber ?? 'לא קיים מספר טלפון'}</p>
        </div>

        <div className="flex justify-between">
          <h2>מקצוע:</h2>
          <p>{expense.profession}</p>
        </div>

        <div className="flex justify-between">
          <h2>סכום כולל:</h2>
          <p
            className={cn('', {
              'text-green-500': expense.remaining === 0,
            })}
          >
            {formatPrice(expense.amount)}
          </p>
        </div>

        <div className="flex justify-between">
          <h2>מקדמה:</h2>
          <p>{formatPrice(expense.deposit ?? 0)}</p>
        </div>

        <MilestonePaymentMoreDetails
          expense={expense}
          milestonePaymentLength={expense.milestonePayment.length}
        />

        <div className="flex justify-between">
          <h2>יתרה לתשלום:</h2>
          <p>{formatPrice(expense.remaining)}</p>
        </div>

        <div className="flex justify-between">
          <h2>תהליך התקדמות:</h2>
          <p>{expense.workProgress ?? '0%'}</p>
        </div>

        <CollapsibleDescription description={expense.description} />

        <div className="flex justify-between">
          <h2>תאריך יצירה:</h2>
          <p>{format(new Date(expense.createdAt), 'HH:mm dd/MM/yy')}</p>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Link
          href="/dashboard"
          className={buttonVariants({
            className: 'flex gap-1 text-base',
            variant: 'ghost',
          })}
        >
          חזור לרשימת ההוצאות
          <ArrowLeft className="size-5 mr-1 my-auto" />
        </Link>
      </div>
    </main>
  );
};
