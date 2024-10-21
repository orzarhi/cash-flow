import { z } from 'zod';

export const createExpenseSchema = z.object({
  supplierName: z
    .string()
    .min(1, 'שם הספק הוא שדה חובה.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'שם הספק יכול להכיל רק אותיות בעברית ואנגלית.'),

  phoneNumber: z
    .string()
    .max(10, 'מספר טלפון יכול להכיל עד 10 ספרות.')
    .optional()
    .refine((value) => !value || /^\d+$/.test(value), 'מספר טלפון יכול להכיל רק מספרים.'),

  profession: z
    .string()
    .min(1, 'מקצוע הוא שדה חובה.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'מקצוע יכול להכיל רק אותיות בעברית ואנגלית.'),

  amount: z.string().min(1, 'מחיר חייב להיות מספר חיובי.').max(8, 'מחיר יכול להכיל עד 8 ספרות.'),

  advance: z
    .string()
    .max(8, 'המקדמה יכולה להכיל עד 8 ספרות.')
    .optional()
    .refine((value) => !value || /^\d+$/.test(value), 'המקדמה חייב להיות מספר חיובי.'),

  description: z
    .string()
    .max(255, 'הערות יכולות להכיל עד 255 תווים.')
    .optional()
    .refine(
      (value) => !value || /^[א-תa-zA-Z0-9\s.,-_]*$/.test(value),
      'הערות יכולות להכיל רק אותיות בעברית ואנגלית, מספרים, ותווים כמו: . , - _'
    ),
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
