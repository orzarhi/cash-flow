'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { useDeleteMilestonePayment } from '@/hooks/use-milestone-payment';
import { formatPrice } from '@/lib/utils';
import { Expense, PAYMENT } from '@prisma/client';
import { format } from 'date-fns';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { LABEL_MAP } from './upsert-milestone-payment';

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

  const { mutate: deleteMilestonePayment, isPending } =
    useDeleteMilestonePayment(setMilestonePaymentId);

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
              <div key={milestone.id} className="p-4 shadow-sm">
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
                        variant: 'link',
                        size: 'icon',
                      })}
                    >
                      <Pencil className='mr-auto'/>
                    </Link>
                    <Button
                      size="icon"
                      variant="link"
                      onClick={() => deleteMilestonePayment(milestone.id)}
                    >
                      {isPending && milestonePaymentId === milestone.id ? (
                        <Loader2 className="text-red-500 animate-spin mr-auto" />
                      ) : (
                        <Trash2 className="text-red-500 mr-auto" />
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
