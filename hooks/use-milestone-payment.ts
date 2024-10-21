import {
  createMilestonePaymentAction,
  deleteMilestonePaymentAction,
  updateMilestonePaymentAction,
} from '@/app/milestone-payment/[id]/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

export const useCreateMilestonePayment = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['create-milestone-payment'],
    mutationFn: createMilestonePaymentAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה ביצירת הוצאה חדשה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error, expenseId }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה חדשה נוצרה בהצלחה.');
      router.push(`/expense/${expenseId}`);
    },
  });
};

export const useDeleteMilestonePayment = (
  setMilestonePaymentId: Dispatch<SetStateAction<string | null>>
) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['create-milestone-payment'],
    mutationFn: deleteMilestonePaymentAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה במחיקת מפרעה זה, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error, expenseId }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה נמחקה בהצלחה.');
      router.push(`/expense/${expenseId}`);
    },
    onSettled: () => {
      setMilestonePaymentId(null);
    },
    onMutate: (milestonePaymentId: string) => {
      setMilestonePaymentId(milestonePaymentId);
    },
  });
};

export const useUpdateMilestonePayment = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['update-milestone-payment'],
    mutationFn: updateMilestonePaymentAction,
    onError: (error) => {
      console.error(error);
      toast.error('אירעה שגיאה בעדכון מפרעה זו, אנא נסה שוב מאוחר יותר.');
    },
    onSuccess: ({ success, error, expenseId }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה עודכנה בהצלחה.');
      router.push(`/expense/${expenseId}`);
    },
  });
};
