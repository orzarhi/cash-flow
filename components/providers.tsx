'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" enableSystem={true} defaultTheme="system">
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};
