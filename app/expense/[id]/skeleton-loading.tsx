import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const SkeletonLoading = () => {
  return (
    <main className="min-h-screen space-y-10 sm:p-8">
      <div className="flex justify-between p-4 mt-2 sm:p-0 sm:mt-0 mb-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="w-full rounded-lg p-4 dark:shadow-zinc-400/5 shadow-sm space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-40" />
          </div>
        ))}

        <Skeleton className="h-6 w-36 mt-4" />

        <div className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </main>
  );
};
