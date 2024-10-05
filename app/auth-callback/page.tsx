'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuthStatus } from './actions';

export default function Page() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) router.push('/dashboard');

  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <h3 className="font-semibold text-xl">מאמת פרטי משתמש...</h3>
        <p>מיד תועבר אוטומטית לדף המבוקש</p>
      </div>
    </div>
  );
}
