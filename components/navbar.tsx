import { cn } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MaxWidthWrapper } from './max-width-wrapper';
import { Menu } from './menu';
import { buttonVariants } from './ui/button';
import React from 'react';

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 dark:border-b-zinc-600 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            feed<span className="text-primary">back</span>
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
                  Dashboard ✨
                </Link>
                <Link
                  href="/profile"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Profile
                </Link>
                <Link
                  href="/plans"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Plans & Pricing
                </Link>
                <Link
                  href="/about"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  About Us
                </Link>
                <a
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'relative left-4 sm:left-0',
                  })}
                >
                  Sign out
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
                  Sign up
                </a>

                <a
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Login
                </a>
              </>
            )}
            <div className="h-8 w-px bg-muted-foreground hidden sm:block" />
            <Link
              href="/create-survey"
              prefetch
              className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
              })}
            >
              Get started
              <ArrowRight className="size-5 ml-1.5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};