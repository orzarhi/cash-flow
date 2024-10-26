'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScrollReload } from '@/hooks/use-scroll-reload';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  useScrollReload();
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" enableSystem={true} defaultTheme="system">
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};
