'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { formatPrice } from '@/lib/utils';
import { Expense, PAYMENT } from '@prisma/client';
import { useState } from 'react';
import { LABEL_MAP } from './upsert-milestone-payment';
import { format } from 'date-fns';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { deleteMilestonePaymentAction } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ExpenseWithout = Omit<Expense, 'userId' | 'updatedAt'>;

interface MoreDetailsProps {
  expense: ExpenseWithout & {
    milestonePayment: {
      id: string;
      description: string | null;
      title: string;
      paidAmount: number;
      paymentType: PAYMENT;
      date: Date;
    }[];
  };
  milestonePaymentLength: number;
}

export const MilestonePaymentMoreDetails = ({
  expense,
  milestonePaymentLength,
}: MoreDetailsProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [milestonePaymentId, setMilestonePaymentId] = useState<string | null>(null);

  const router = useRouter();

  const { mutate: deleteMilestonePayment, isPending } = useMutation({
    mutationKey: ['create-milestone-payment'],
    mutationFn: deleteMilestonePaymentAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה במחיקת מפרעה זה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה נמחקה בהצלחה.');
      router.push('/dashboard');
    },
    onSettled: () => {
      setMilestonePaymentId(null);
    },
    onMutate: (milestonePaymentId: string) => {
      setMilestonePaymentId(milestonePaymentId);
    },
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-1">
          <h2>מפרעות:</h2>
          {milestonePaymentLength ? (
            <a
              className="text-muted-foreground text-sm cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              הצגת פרטים נוספים ({milestonePaymentLength})
            </a>
          ) : null}
        </div>
        <p>{formatPrice(expense.totalMilestonePayment)}</p>
      </div>
      <ResponsiveDialog isOpen={modalOpen} textCenter={true} setIsOpen={setModalOpen}>
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            פרטי מפרעות ({milestonePaymentLength})
          </h1>
          <div className="space-y-4">
            {expense.milestonePayment.map((milestone, index) => (
              <div
                key={milestone.id}
                className="border-b last:border-0 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-medium">
                    {index + 1}. {milestone.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(milestone.date, 'dd/MM/yy')}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">
                    {formatPrice(milestone.paidAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {LABEL_MAP[milestone.paymentType]}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-right w-2/3 text-muted-foreground mt-2">
                    {milestone.description}
                  </p>
                  <div className="flex gap-0.5">
                    <Link
                      href={`/milestone-payment/${expense.id}?milestonePaymentId=${milestone.id}`}
                      className={buttonVariants({
                        variant: 'ghost',
                      })}
                    >
                      <Pencil />
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMilestonePayment(milestone.id)}
                    >
                      {isPending && milestonePaymentId === milestone.id ? (
                        <Loader2 className="text-red-500 animate-spin" />
                      ) : (
                        <Trash2 className="text-red-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveDialog>
    </>
  );
};
