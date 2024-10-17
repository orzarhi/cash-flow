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

    if (advance && parseFloat(amount) < parseFloat(advance)) {
      return {
        success: false,
        error: 'המקדמה לא יכולה להיות גבוהה מהמחיר.',
      };
    }

    await db.expense.create({
      data: {
        supplierName,
        phoneNumber: phoneNumber || null,
        profession,
        amount: parseFloat(amount),
        deposit: advance ? parseFloat(advance) : 0,
        description: description || null,

        remaining: parseFloat(amount) - (advance ? parseFloat(advance) : 0),
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
