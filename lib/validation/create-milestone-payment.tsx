import { z } from 'zod';

export const createMilestonePaymentSchema = z.object({
  title: z
    .string()
    .min(1, 'שם המפרעה הוא שדה חובה.')
    .max(25, 'שם המפרעה יכול להכיל עד 25 תווים.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'שם המפרעה יכול להכיל רק אותיות בעברית ואנגלית.'),

  amount: z
    .string()
    .min(1, 'סכום חייב להיות מספר חיובי.')
    .max(8, 'סכום יכול להכיל עד 8 ספרות.')
    .regex(/^\d+$/, 'סכום חייב להיות מספר חיובי.'),

  date: z.date(),

  description: z
    .string()
    .max(255, 'הערות יכולות להכיל עד 255 תווים.')
    .optional()
    .refine(
      (value) => !value || /^[א-תa-zA-Z0-9\s.,-_]*$/.test(value),
      'הערות יכולות להכיל רק אותיות בעברית ואנגלית, מספרים, ותווים כמו: . , - _'
    ),
});

export type CreateMilestonePayment = z.infer<typeof createMilestonePaymentSchema>;
