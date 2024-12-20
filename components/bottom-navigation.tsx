'use client';

import { cn } from '@/lib/utils';
import { ChartSpline, Home, LayoutDashboard, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BottomNavigation = () => {
  const pathname = usePathname();

  const [showNav, setShowNav] = useState(true);

  const navItems = [
    { href: '/', icon: <Home className="size-6" /> },
    {
      href: '/dashboard',
      icon: <LayoutDashboard className="size-6" />,
    },
    {
      href: '/expense/upsert',
      icon: <Plus className="size-6" />,
    },
    { href: '/statistics', icon: <ChartSpline className="size-6" /> },
    { href: '/profile', icon: <User className="size-6" /> },
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
        'fixed left-0 bottom-0 w-full bg-background h-20 border-t border-muted shadow-md z-10 transition-transform duration-300',
        {
          'transform translate-y-full': !showNav,
        }
      )}
    >
      <ul className="flex justify-between items-center text-muted-foreground w-full">
        {navItems.map((item, index) => (
          <li key={index} className="flex-1 text-center">
            <Link
              href={item.href}
              className={cn('flex flex-col items-center py-3 mt-1', {
                'text-black dark:text-white': pathname === item.href,

                'bg-primary rounded-full text-white w-2/3 mx-auto':
                  item.href === '/expense/upsert',
              })}
            >
              <span className="">{item.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
