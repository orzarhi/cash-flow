'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PullToRefresh from 'react-pull-to-refresh';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  const handleRefresh = () => {
    return new Promise<void>((resolve) => {
      window.location.reload();
      resolve();
    });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" enableSystem={true} defaultTheme="system">
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </PullToRefresh>
  );
};
