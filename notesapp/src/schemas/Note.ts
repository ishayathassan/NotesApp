import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.string(),
  user_id: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
