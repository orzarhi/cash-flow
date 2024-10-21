'use client';

import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const OPTIONS = [
    { icon: Sun, theme: 'light' },
    { icon: Monitor, theme: 'system' },
    { icon: Moon, theme: 'dark' },
  ];

  return (
    <div className="flex items-center justify-center border rounded-full p-1">
      {OPTIONS.map(({ icon: Icon, theme: optionTheme }) => (
        <button
          key={optionTheme}
          onClick={() => setTheme(optionTheme)}
          className={cn('p-2 rounded-full transition-colors', {
            'bg-zinc-200 text-zinc-700': theme === optionTheme && optionTheme === 'light',
            'bg-zinc-700 text-muted-foreground':
              theme === optionTheme && optionTheme === 'dark',
            'text-muted-foreground hover:text-foreground': theme !== optionTheme,
          })}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
};