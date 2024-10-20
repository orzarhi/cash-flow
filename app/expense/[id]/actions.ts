'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const deleteExpenseAction = async (expenseId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const expense = await db.expense.findFirst({
      where: {
        id: expenseId,
        userId: user.id,
      },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }

    await db.expense.delete({
      where: {
        id: expenseId,
      },
    });

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};

export const createMilestonePayment = async (expenseId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const expense = await db.expense.findFirst({
      where: {
        id: expenseId,
        userId: user.id,
      },
    });

    await db.milestonePayment.create({
      data: {
        expenseId,
        title: 'מפרעה חדשה',
        paidAmount: 250,
        paymentType: 'CASH',
        date: new Date(),
      },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }

    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};
