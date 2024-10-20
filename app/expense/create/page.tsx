import React from 'react';
import { UpsertExpense } from './upsert-expense';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  return (
    <main className="min-h-screen mt-8">
      <UpsertExpense />
    </main>
  );
}
