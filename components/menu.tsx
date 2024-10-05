'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Sofa,
  SquarePen,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface MenuProps {
  userId?: string;
}

export const Menu = ({ userId }: MenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 "
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="size-6" /> : <MenuIcon className="size-6" />}
      </button>
      <div
        ref={menuRef}
        className={cn(
          'absolute top-14 left-0 w-full bg-background',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={() => setIsOpen(false)}
      >
        {userId ? (
          <>
            <Link
              href="/create-survey"
              className="flex gap-1.5 px-4 py-2 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 "
            >
              <SquarePen className="size-4 my-auto text-black/80 dark:text-white/80" />
              הוצאה חדשה
            </Link>
            <Link
              href="/dashboard"
              className="flex gap-1.5 px-4 py-2 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 "
            >
              <LayoutDashboard className="size-4 my-auto text-black/80 dark:text-white/80" />
              מרכז ניהול
            </Link>
            <Link
              href="/profile"
              className="flex gap-1.5 px-4 py-2 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 "
            >
              <User className="size-4 my-auto text-black/80 dark:text-white/80" />
              איזור אישי
            </Link>

            <Link
              href="/about"
              className="flex gap-1.5 px-4 py-2 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 "
            >
              <Sofa className="size-4 my-auto text-black/80 dark:text-white/80" />
              אודות
            </Link>
            <a
              href="/api/auth/logout"
              className="flex gap-1.5 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900 "
            >
              <LogOut className="size-4 my-auto text-black/80 dark:text-white/80 " />
              יציאה
            </a>
          </>
        ) : (
          <>
            <a href="/api/auth/register" className="block px-4 py-2">
              הרשמה
            </a>

            <a
              href="/api/auth/login"
              className="block px-4 py-2 border-b border-zinc-200 dark:border-zinc-800"
            >
              התחברות
            </a>
          </>
        )}
      </div>
    </>
  );
};
