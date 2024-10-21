'use client';

import { DatePicker } from '@/app/milestone-payment/[id]/date-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreateMilestonePayment, createMilestonePaymentSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAYMENT } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createMilestonePaymentAction } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LABEL_MAP: Record<PAYMENT, string> = {
  CASH: 'מזומן',
  CARD: 'כרטיס אשראי',
  CHECK: "צ'ק",
  TRANSFER: 'העברה בנקאית',
  OTHER: 'אחר',
};

interface UpsertMilestonePaymentProps {
  expenseId: string;
}

export const UpsertMilestonePayment = ({ expenseId }: UpsertMilestonePaymentProps) => {
  const [paymentType, setPaymentType] = useState<PAYMENT | undefined>(undefined);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateMilestonePayment>({
    resolver: zodResolver(createMilestonePaymentSchema),
    defaultValues: {
      title: '',
      amount: '',
      date: new Date(),
      description: '',
    },
  });

  const { mutate: createMilestonePayment, isPending } = useMutation({
    mutationKey: ['create-milestone-payment'],
    mutationFn: createMilestonePaymentAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה ביצירת הוצאה חדשה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה חדשה נוצרה בהצלחה.');
      router.push('/dashboard');
    },
  });

  const onSubmit = (data: CreateMilestonePayment) => {
    if (!paymentType) {
      toast.error('אנא בחר אופן תשלום.');
      return;
    }

    const payload = { ...data, paymentType, expenseId };

    createMilestonePayment(payload);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1.5">
        <Label htmlFor="title" className="font-semibold">
          שם
        </Label>
        <Input
          type="text"
          id="title"
          placeholder="מלא את שם המפרעה (לדוגמה: מפרעה ראשונה)"
          {...register('title')}
        />
        {errors.title && <span className="error-message">{errors.title.message}</span>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="amount" className="font-semibold">
          סכום
        </Label>
        <Input
          type="number"
          id="amount"
          inputMode="numeric"
          placeholder="מלא את סכום המפרעה (בשקלים)"
          {...register('amount')}
        />
        {errors.amount && <span className="error-message">{errors.amount.message}</span>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="paymentType" className="font-semibold">
          אופן תשלום
        </Label>
        <Select
          dir="rtl"
          value={paymentType}
          onValueChange={(value) => setPaymentType(value as PAYMENT)}
        >
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="בחר אופן תשלום" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(LABEL_MAP).map((type) => (
              <SelectItem key={type} value={type}>
                {LABEL_MAP[type as PAYMENT]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="date" className="font-semibold">
          תאריך
        </Label>
        <DatePicker
          className="w-full justify-start text-left font-normal"
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="note" className="font-semibold">
          הערה
        </Label>
        <Textarea
          id="note"
          placeholder="מלא את הערה (אופציונלי)"
          {...register('description')}
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <Button
        type="submit"
        className="w-44"
        disabled={isPending}
        isLoading={isPending}
        loadingText="נוצרת מפרעה חדשה"
      >
        יצירת מפרעה חדשה
      </Button>
    </form>
  );
};
