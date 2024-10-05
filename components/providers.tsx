'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextThemesProvider attribute="class" enableSystem={true} defaultTheme="system">
      {children}
    </NextThemesProvider>
  );
};