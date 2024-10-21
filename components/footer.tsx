import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './mode-toggle';

export const Footer = () => {
  return (
    <footer className="ltr flex flex-col gap-3 md:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} CashFlow All rights reserved.
      </p>
      <nav className="mx-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
          title="Terms of Service"
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
          title="Privacy Policy"
        >
          Privacy
        </Link>
      </nav>
      <ModeToggle />
    </footer>
  );
};