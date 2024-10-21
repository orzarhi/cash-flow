import { deleteExpenseAction } from '@/app/expense/[id]/actions';
import { createExpenseAction } from '@/app/expense/upsert/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCreateExpense = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['create-expense'],
    mutationFn: createExpenseAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה ביצירת הוצאה חדשה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('הוצאה חדשה נוצרה בהצלחה.');
      router.push('/dashboard');
    },
  });
};

export const useDeleteExpense = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['delete-expense'],
    mutationFn: deleteExpenseAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה במחיקת הוצאה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('ההוצאה נמחקה בהצלחה.');
      router.push('/dashboard');
    },
  });
};
