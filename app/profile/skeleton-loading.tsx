import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const SkeletonLoading = () => {
  return (
    <main className="min-h-screen space-y-4 mt-8">
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" /> 
        <Skeleton className="border-b border-muted-foreground my-4 opacity-30" />
      </div>
     
      <Skeleton className="h-5 w-48" /> 
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-6 rounded-full" /> 
              <Skeleton className="h-4 w-32" /> 
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
   
      <Skeleton className="h-5 w-48" /> 
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" /> 
          </div>
        ))}
      </div>
      
      <Skeleton className="h-5 w-48" /> 
      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-8 w-20 rounded-md" /> 
        <Skeleton className="h-8 w-20 rounded-full" /> 
      </div>
    </main>
  );
};
