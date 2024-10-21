import React from 'react';
import { UpsertExpense } from './upsert-expense';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import { db } from '@/db';

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  if (Object.keys(searchParams).length) {
    const { expenseId } = searchParams;

    const expense = await db.expense.findFirst({
      where: {
        userId: user.id,
        id: expenseId,
      }
    });

    if (!expense) {
      return notFound();
    }

    return (
      <main className="min-h-screen mt-8">
        <UpsertExpense expense={expense} />
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-8">
      <UpsertExpense />
    </main>
  );
}
