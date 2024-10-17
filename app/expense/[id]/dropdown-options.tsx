'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { Ellipsis, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { deleteExpenseAction } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DropdownOptionsProps {
  expenseId: string;
}

export const DropdownOptions = ({ expenseId }: DropdownOptionsProps) => {
  const router = useRouter();

  const { mutate: deleteExpense, isPending } = useMutation({
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
      toast.success('הוצאה נמחקה בהצלחה.');
      router.push('/dashboard');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Ellipsis className="size-5" />
          )}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 mx-2 sm:mx-0">
        <DropdownMenuItem className="flex p-2.5">
          <Plus className="size-5" />
          <span className="mx-2 ml-auto">מפרעה</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex p-2.5">
          <Pencil className="size-5" />
          <span className="mx-2 ml-auto">עריכה</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex p-2.5" onClick={() => deleteExpense(expenseId)}>
          <Trash2 className="size-5 text-red-500" />
          <span className="mx-2 ml-auto text-red-500">מחיקה</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
