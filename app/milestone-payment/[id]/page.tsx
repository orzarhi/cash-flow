import React from 'react';
import { UpsertMilestonePayment } from './upsert-milestone-payment';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const expense = await db.expense.findFirst({
    where: {
      userId: user.id,
      id: params.id,
    },
  });

  if (!expense) {
    return notFound();
  }

  if (Object.keys(searchParams).length) {
    const { milestonePaymentId } = searchParams;

    const milestonePayment = await db.milestonePayment.findFirst({
      where: {
        expenseId: expense.id,
        id: milestonePaymentId,
      },
    });

    return (
      <main className="min-h-screen space-y-4 mt-8">
        <h1 className="sm:text-2xl text-xl">
          עדכון מפרעה ל{expense.supplierName} ({expense.profession})
        </h1>
        <UpsertMilestonePayment
          expenseId={expense.id}
          milestonePayment={milestonePayment}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-4 mt-8">
      <h1 className="sm:text-2xl text-xl">
        מפרעה חדשה ל{expense.supplierName} ({expense.profession})
      </h1>
      <UpsertMilestonePayment expenseId={expense.id} />
    </main>
  );
}
