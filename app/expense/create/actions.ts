'use server';

import { type CreateExpense, createExpenseSchema } from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export const createExpense = async (expense: CreateExpense) => {
  try {
    const { supplierName, phoneNumber, profession, amount, advance, description } =
      createExpenseSchema.parse(expense);

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    await db.expense.create({
      data: {
        supplierName,
        phoneNumber,
        profession,
        amount: parseFloat(amount),
        deposit: parseFloat(advance),
        description,
        userId: user.id,
      },
    });

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};
