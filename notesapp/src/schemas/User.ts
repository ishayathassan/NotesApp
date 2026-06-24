import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

// Registers
export const UserCreateInputSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    password: z.string().min(6, "Password can't be less than 6 characters"),
  });

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

// Login
export const UserLoginInputSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    password: z.string().min(1, "Password can't be empty"),
    remember_me: z.boolean(),
  });

export const UserLoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  user: userSchema,
});

export type UserLoginInput = z.infer<typeof UserLoginInputSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
