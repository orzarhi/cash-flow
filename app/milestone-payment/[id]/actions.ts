'use server';

import { db } from '@/db';
import {
  CreateMilestonePayment,
  createMilestonePaymentSchema,
  expenseIdValidation,
  milestonePaymentIdValidation,
} from '@/lib/validation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PAYMENT } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createMilestonePaymentAction = async (
  milestonePayment: CreateMilestonePayment & { expenseId: string; paymentType: PAYMENT }
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const { amount, title, date, description } =
      createMilestonePaymentSchema.parse(milestonePayment);

    const { expenseId, paymentType } = milestonePayment;

    if (!expenseId) {
      throw new Error('Expense ID not found');
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

    await db.milestonePayment.create({
      data: {
        expenseId: expense.id,
        title,
        paidAmount: parseFloat(amount),
        paymentType,
        date,
        description: description || null,
      },
    });

    await db.expense.update({
      where: {
        id: expenseId,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          increment: parseFloat(amount),
        },
        remaining: {
          decrement: parseFloat(amount),
        },
      },
    });

    revalidatePath(`/expense/${expenseId}`);

    return { success: true, expenseId };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};

export const deleteMilestonePaymentAction = async (milestonePaymentId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    milestonePaymentIdValidation.parse(milestonePaymentId);

    const milestonePayment = await db.milestonePayment.findFirst({
      where: {
        id: milestonePaymentId,
        expense: {
          userId: user.id,
        },
      },
    });

    if (!milestonePayment) {
      throw new Error('Milestone payment not found');
    }

    await db.expense.update({
      where: {
        id: milestonePayment.expenseId as string,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          decrement: milestonePayment.paidAmount,
        },
        remaining: {
          increment: milestonePayment.paidAmount,
        },
      },
    });

    await db.milestonePayment.delete({
      where: {
        id: milestonePaymentId,
      },
    });

    revalidatePath(`/expense/${milestonePayment.expenseId}`);

    return { success: true, expenseId: milestonePayment.expenseId };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};

export const updateMilestonePaymentAction = async (
  milestonePayment: CreateMilestonePayment & {
    expenseId: string;
    paymentType: PAYMENT;
    milestonePaymentId: string;
  }
) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const { amount, title, date, description } =
      createMilestonePaymentSchema.parse(milestonePayment);

    const { expenseId, paymentType, milestonePaymentId } = milestonePayment;

    milestonePaymentIdValidation.parse(milestonePaymentId);
    expenseIdValidation.parse(expenseId);

    if (!expenseId) {
      throw new Error('Expense ID not found');
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

    const milestonePaymentExist = await db.milestonePayment.findFirst({
      where: {
        id: milestonePaymentId,
        expense: {
          userId: user.id,
        },
      },
    });

    if (!milestonePaymentExist) {
      throw new Error('Milestone payment not found');
    }

    await db.expense.update({
      where: {
        id: expenseId,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          decrement: milestonePaymentExist.paidAmount,
        },
        remaining: {
          increment: milestonePaymentExist.paidAmount,
        },
      },
    });

    await db.milestonePayment.update({
      where: {
        id: milestonePaymentId,
      },
      data: {
        title,
        paidAmount: parseFloat(amount),
        paymentType,
        date,
        description: description || null,
      },
    });

    await db.expense.update({
      where: {
        id: expenseId,
        userId: user.id,
      },
      data: {
        totalMilestonePayment: {
          increment: parseFloat(amount),
        },
        remaining: {
          decrement: parseFloat(amount),
        },
      },
    });

    revalidatePath(`/expense/${expenseId}`);

    return { success: true, expenseId };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'משהו השתבש, נסה שוב מאוחר יותר.',
    };
  }
};
