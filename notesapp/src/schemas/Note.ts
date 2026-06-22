import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Note can't have empty title"),
  content: z.string().min(1, "Content can not be empty"),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const NoteCreateInputSchema = noteSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  user_id: true,
});

export type Note = z.infer<typeof noteSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateInputSchema>;
