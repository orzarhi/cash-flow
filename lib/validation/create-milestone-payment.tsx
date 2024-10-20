import { PAYMENT } from '@prisma/client';
import { z } from 'zod';

export const createMilestonePaymentSchema = z.object({
  title: z
    .string()
    .min(1, 'שם המפרעה הוא שדה חובה.')
    .regex(/^[א-תa-zA-Z\s]+$/, 'שם המפרעה יכול להכיל רק אותיות בעברית ואנגלית.'),

  amount: z
    .string()
    .min(1, 'סכום חייב להיות מספר חיובי.')
    .regex(/^\d+$/, 'סכום חייב להיות מספר חיובי.'),

  paymentType: z.enum([
    PAYMENT.CARD,
    PAYMENT.CASH,
    PAYMENT.CHECK,
    PAYMENT.TRANSFER,
    PAYMENT.OTHER,
  ]),

  date: z.date(),

  description: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[א-תa-zA-Z0-9\s.,-_]*$/.test(value),
      'הערות יכולות להכיל רק אותיות בעברית ואנגלית, מספרים, ותווים כמו: . , - _'
    ),
});

export type CreateMilestone = z.infer<typeof createMilestonePaymentSchema>;
