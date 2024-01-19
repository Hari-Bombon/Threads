import * as z from 'zod';

export const UserValidation = z.object({
  profile_photo: z.string().url().min(1),  // Use min(1) instead of nonempty()
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
});
