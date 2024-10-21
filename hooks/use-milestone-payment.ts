import { createMilestonePaymentAction, updateMilestonePaymentAction } from '@/app/milestone-payment/[id]/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
    onSuccess: ({ success, error }) => {
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success('מפרעה חדשה נוצרה בהצלחה.');
      router.push('/dashboard');
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
        onSuccess: ({ success, error }) => {
        if (!success) {
            toast.error(error);
            return;
        }
        toast.success('מפרעה עודכנה בהצלחה.');
        router.push('/dashboard');
        },
    });
}
