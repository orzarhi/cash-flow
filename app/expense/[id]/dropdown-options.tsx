'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteExpense } from '@/hooks/use-expense';
import { Ellipsis, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DropdownOptionsProps {
  expenseId: string;
}

export const DropdownOptions = ({ expenseId }: DropdownOptionsProps) => {
  const router = useRouter();

  const { mutate: deleteExpense, isPending } = useDeleteExpense();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon"  className="flex p-0">
            {isPending ? (
              <Loader2 className="size-5 animate-spin shrink-0" />
            ) : (
              <Ellipsis className="size-5 shrink-0" />
            )}
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 mx-1.5">
          <DropdownMenuItem
            className="flex p-2.5"
            onClick={() => router.push(`/milestone-payment/${expenseId}`)}
          >
            <Plus className="size-5" />
            <span className="mx-2 ml-auto">מפרעה</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex p-2.5">
            <Pencil className="size-5" />
            <span className="mx-2 ml-auto">עריכה</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex p-2.5"
            onClick={() => deleteExpense(expenseId)}
          >
            <Trash2 className="size-5 text-red-500" />
            <span className="mx-2 ml-auto text-red-500">מחיקה</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
