import { cn } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { MaxWidthWrapper } from './max-width-wrapper';
import { Menu } from './menu';
import { buttonVariants } from './ui/button';
import React from 'react';

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-muted-foreground backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            <Image src="/logo.webp" alt="toolCash logo" width={24} height={24} />
          </Link>

          {user?.id && (
            <div className="lg:hidden flex items-center">
              <Menu userId={user?.id} />
            </div>
          )}

          <div
            className={cn('lg:flex h-full items-center space-x-4', {
              hidden: user?.id,
              flex: !user?.id,
            })}
          >
            {user?.id ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  מרכז ניהול ✨
                </Link>
                <Link
                  href="/profile"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  איזור אישי
                </Link>
                <Link
                  href="/about"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  אודות
                </Link>
                <a
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'relative left-4 sm:left-0',
                  })}
                >
                  יציאה
                </a>
              </>
            ) : (
              <>
                <a
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  הרשמה
                </a>

                <a
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  התחברות
                </a>
              </>
            )}
            {user?.id && (
              <>
                <div className="h-8 w-px bg-muted-foreground hidden sm:block" />
                <Link
                  href="/expense/create"
                  prefetch
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  הוצאה חדשה
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
