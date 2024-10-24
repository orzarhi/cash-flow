import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const currentUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser) {
    return notFound();
  }

  const expenses = await db.expense.findMany({
    where: {
      userId: user.id,
    },
    select: {
      _count: {
        select: {
          milestonePayment: true,
        },
      },
      id: true,
      supplierName: true,
      createdAt: true,
      milestonePayment: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const nameFallback = `${user.given_name?.[0]}${user.family_name?.[0]}`;

  return (
    <main className="min-h-screen space-y-4 mt-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback>{nameFallback.toLocaleUpperCase()}</AvatarFallback>
          <AvatarImage
            className="no-draggable"
            src={currentUser?.imageUrl as string}
            alt="avatar-image"
          />
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">ברוך הבא, {user.given_name}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">
          תאריך הצטרפות: {format(new Date(currentUser.createdAt), 'dd/MM/yyyy')}
        </p>

        <div className="border-b border-muted-foreground my-4 opacity-30" />
      </div>

      <h2 className="text-lg font-bold">הוצאות אחרונות ({expenses.length})</h2>
      <div className="space-y-2">
        {expenses ? (
          expenses.map((expense) => (
            <p className="text-muted-foreground" key={expense.id}>
              - {expense.supplierName} בתאריך{' '}
              {format(new Date(expense.createdAt), 'dd/MM/yyyy')}
            </p>
          ))
        ) : (
          <p className="text-muted-foreground">לא קיימות הוצאות אחרונות.</p>
        )}
      </div>

        <h2 className="text-lg font-bold">הגדרות</h2>
        <div className="flex items-center justify-between mt-4">
          <a
            href="/api/auth/logout"
            className={buttonVariants({
              size: 'sm',
              variant: 'secondary',
              className: '',
            })}
          >
            יציאה
          </a>
          <ModeToggle />
        </div>
    </main>
  );
}
