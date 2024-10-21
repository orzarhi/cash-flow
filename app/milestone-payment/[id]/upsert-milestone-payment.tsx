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
import {
  useCreateMilestonePayment,
  useUpdateMilestonePayment,
} from '@/hooks/use-milestone-payment';
import { CreateMilestonePayment, createMilestonePaymentSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { MilestonePayment, PAYMENT } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const LABEL_MAP: Record<PAYMENT, string> = {
  CASH: 'מזומן',
  CARD: 'כרטיס אשראי',
  CHECK: "צ'ק",
  TRANSFER: 'העברה בנקאית',
  OTHER: 'אחר',
};

interface UpsertMilestonePaymentProps {
  expenseId: string;
  milestonePayment?: MilestonePayment | null;
}

export const UpsertMilestonePayment = ({
  expenseId,
  milestonePayment,
}: UpsertMilestonePaymentProps) => {
  const [paymentType, setPaymentType] = useState<PAYMENT | undefined>(milestonePayment?.paymentType || undefined);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateMilestonePayment>({
    resolver: zodResolver(createMilestonePaymentSchema),
    defaultValues: {
      title: milestonePayment?.title || '',
      amount: milestonePayment?.paidAmount.toString() || '',
      date: milestonePayment?.date || new Date(),
      description: milestonePayment?.description || '',
    },
  });

  const { mutate: createMilestonePayment, isPending: createIsPending } =
    useCreateMilestonePayment();
  const { mutate: updateMilestonePayment, isPending: updateIsPending } =
    useUpdateMilestonePayment();

  const isPending = createIsPending || updateIsPending;
  const buttonText = milestonePayment ? 'עדכון מפרעה קיימת' : 'יצירת מפרעה חדשה';
  const loadingText = milestonePayment ? 'מעדכן מפרעה קיימת' : 'נוצרת מפרעה חדשה';


  const onSubmit = (data: CreateMilestonePayment) => {
    // Create a new milestone payment
    if (!milestonePayment) {
      if (!paymentType) {
        toast.error('אנא בחר אופן תשלום.');
        return;
      }

      const payload = { ...data, paymentType, expenseId };

      createMilestonePayment(payload);
    }

    // Update an existing milestone payment
    else {
      if (!paymentType) {
        toast.error('אנא בחר אופן תשלום.');
        return;
      }
      const payload = {
        ...data,
        paymentType,
        expenseId,
        milestonePaymentId: milestonePayment.id,
      };

      updateMilestonePayment(payload);
    }
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
          defaultValue={milestonePayment?.paymentType}
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
        loadingText={loadingText}
      >
        {buttonText}
      </Button>
    </form>
  );
};
