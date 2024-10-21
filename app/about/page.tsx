import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  return (
    <main className="min-h-screen space-y-8 mt-8">
      <h1 className="text-center text-2xl">אנחנו עדיין בבנייה 🚧</h1>
    </main>
  );
}
