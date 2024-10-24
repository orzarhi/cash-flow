import { cn } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNavigation } from './bottom-navigation';
import { MaxWidthWrapper } from './max-width-wrapper';
import { buttonVariants } from './ui/button';

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <nav
        className={cn('sticky z-[100] h-14 inset-x-0 top-0 w-full', {
          'max-sm:hidden block border-b border-muted-foreground backdrop-blur-lg transition-all': user?.id,
          'hidden': !user?.id,
        })}
      >
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between">
            {user?.id && (
              <Link href="/" className="flex z-40 font-semibold">
                <Image src="/logo.webp" alt="toolCash logo" width={24} height={24} />
              </Link>
            )}
            <div
              className={cn('lg:flex h-full items-center space-x-4', {
                flex: user?.id,
              })}
            >
              {user?.id && (
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
              )}
              {user?.id && (
                <>
                  <div className="h-8 w-px bg-muted-foreground hidden sm:block" />
                  <Link
                    href="/expense/upsert"
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
      {user?.id && (
        <div className="hidden max-sm:block">
          <BottomNavigation />
        </div>
      )}
    </>
  );
};
