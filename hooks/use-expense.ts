import { deleteExpenseAction } from '@/app/expense/[id]/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
