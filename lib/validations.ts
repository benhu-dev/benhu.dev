import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email').max(160, 'Email is too long'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(4000, 'Message is too long'),
  honeypot: z.string().optional().default(''),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;
