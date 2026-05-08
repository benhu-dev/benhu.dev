import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "at least 2 characters please. even 'AI' works")
    .max(100, 'name is too long'),
  email: z
    .string()
    .trim()
    .email('regex says no. double-check the email?')
    .max(200, 'email is too long'),
  message: z
    .string()
    .trim()
    .min(10, '`hi` is friendly but I need 10+ characters')
    .max(5000, 'message is too long. brevity is a virtue'),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;
