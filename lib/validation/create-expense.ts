import { z } from 'zod';

export const createExpenseSchema = z.object({
  supplierName: z
    .string()
    .min(1, 'שם הספק הוא שדה חובה.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'שם הספק יכול להכיל רק אותיות בעברית ואנגלית.'),

  phoneNumber: z
    .string()
    .min(1, 'מספר טלפון הוא שדה חובה.')
    .regex(/^[0-9]+$/, 'מספר טלפון יכול להכיל רק מספרים.'),

  profession: z
    .string()
    .min(1, 'מקצוע הוא שדה חובה.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'מקצוע יכול להכיל רק אותיות בעברית ואנגלית.'),

    amount: z.string().min(1, 'מחיר חייב להיות מספר חיובי.'),

  advance: z.string().min(1, 'מקדמה חייבת להיות מספר חיובי.'),

  description: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[א-תa-zA-Z0-9\s.,-_]*$/.test(value),
      'הערות יכולות להכיל רק אותיות בעברית ואנגלית, מספרים, ותווים כמו: . , - _'
    ),
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
