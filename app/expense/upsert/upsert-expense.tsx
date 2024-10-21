'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateExpense } from '@/hooks/use-expense';
import { CreateExpense, createExpenseSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Expense } from '@prisma/client';
import { useForm } from 'react-hook-form';

interface UpsertExpenseProps {
  expense?: Expense;
}

export const UpsertExpense = ({ expense }: UpsertExpenseProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpense>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      supplierName: expense?.supplierName || '',
      phoneNumber: expense?.phoneNumber || '',
      profession: expense?.profession || '',
      amount: expense?.amount.toString() || '',
      deposit: expense?.deposit?.toString() || '',
      description: expense?.description || '',
    },
  });

  const { mutate: createExpense, isPending } = useCreateExpense();

  const onSubmit = (data: CreateExpense) => {
    createExpense(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="supplierName" className="font-semibold">
          שם הספק
        </Label>
        <Input
          type="text"
          id="supplierName"
          placeholder="מלא את שם הספק (לדוגמה: יוסי כהן)"
          {...register('supplierName')}
        />
        {errors.supplierName && (
          <p className="error-message">{errors.supplierName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phoneNumber" className="font-semibold">
          מספר טלפון
        </Label>
        <Input
          type="number"
          id="phoneNumber"
          inputMode="numeric"
          placeholder="מלא את מספר הטלפון (אופצונלי)"
          {...register('phoneNumber')}
        />
        {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="font-semibold" htmlFor="profession">
          מקצוע
        </Label>
        <Input
          type="text"
          id="profession"
          placeholder="לדוגמה: אינסטלטור, חשמלאי, קבלן"
          {...register('profession')}
        />
        {errors.profession && (
          <p className="error-message">{errors.profession.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="font-semibold" htmlFor="amount">
          מחיר
        </Label>
        <Input
          type="number"
          id="amount"
          inputMode="numeric"
          placeholder="הכנס מחיר (בשקלים)"
          {...register('amount')}
        />
        {errors.amount && <p className="error-message">{errors.amount.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label className="font-semibold" htmlFor="deposit">
          מקדמה
        </Label>
        <Input
          type="number"
          id="deposit"
          inputMode="numeric"
          placeholder="הכנס את סכום המקדמה (אופצונלי)"
          {...register('deposit')}
        />
        {errors.deposit && <p className="error-message">{errors.deposit.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label className="font-semibold" htmlFor="description">
          הערות
        </Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="הוסף הערות נוספות או פרטים חשובים"
          {...register('description')}
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Button
          className="w-44"
          disabled={isPending}
          isLoading={isPending}
          loadingText="נוצרת הוצאה חדשה"
        >
          יצירת הוצאה חדשה
        </Button>
      </div>
    </form>
  );
};
