import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(6, "Password can't be less than 6 characters"),
});

export const UserCreateInputSchema = userSchema.omit({
  id: true,
});

export const UserLoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememember_me: z.boolean(),
});

export const UserLoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const UserCreateResponseSchema = userSchema.omit({
  password: true,
});

export type User = z.infer<typeof userSchema>;
export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type UserCreateResponse = z.infer<typeof UserCreateResponseSchema>;
export type UserLoginInput = z.infer<typeof UserLoginInputSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
