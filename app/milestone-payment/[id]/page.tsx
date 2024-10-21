import React from 'react';
import { UpsertMilestonePayment } from './upsert-milestone-payment';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
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

  return (
    <main className="min-h-screen space-y-4 mt-8">
      <h1 className="sm:text-2xl text-xl">
        מפרעה חדשה ל{expense.supplierName} ({expense.profession})
      </h1>
      <UpsertMilestonePayment expenseId={expense.id} />
    </main>
  );
}
