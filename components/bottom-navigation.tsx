'use client';

import { cn } from '@/lib/utils';
import { Home, LayoutDashboard, SquarePen, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BottomNavigation = () => {
  const pathname = usePathname();

  const [showNav, setShowNav] = useState(true);

  const navItems = [
    { name: 'בית', href: '/', icon: <Home className="size-5" /> },
    {
      name: 'מרכז ניהול',
      href: '/dashboard',
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      name: 'הוצאה חדשה',
      href: '/expense/upsert',
      icon: <SquarePen className="size-5" />,
    },
    { name: 'פרופיל', href: '/profile', icon: <User className="size-5" /> },
  ];

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) setShowNav(false);
      else setShowNav(true);

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed left-0 bottom-0 w-full bg-background h-[4.5rem] border-t border-muted shadow-md z-10 transition-transform duration-300',
        {
          'transform translate-y-full': !showNav,
        }
      )}
    >
      <ul className="flex justify-between items-center text-muted-foreground w-full">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1 text-center">
            <Link
              href={item.href}
              className={cn('flex flex-col items-center py-3', {
                'text-black dark:text-white': pathname === item.href,
              })}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
