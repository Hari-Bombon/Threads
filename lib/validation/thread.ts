import * as z from 'zod';

export const ThreadValidation = z.object({
  thread: z.string().min(1),  // Use min(1) instead of nonempty()
  accountId: z.string(),
});

export const CommentValidation = z.object({
    thread: z.string().min(1).max(5),  // Use min(1) instead of nonempty()
  });