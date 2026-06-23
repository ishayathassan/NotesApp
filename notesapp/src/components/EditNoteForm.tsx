import { Note } from "../schemas/Note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NoteCreateInput,
  NoteCreateInputSchema,
  NoteUpdateInput,
} from "../schemas/Note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api/notes";
import { useNavigate } from "react-router-dom";

export default function EditNoteForm({ note }: { note: Note }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteCreateInput>({
    resolver: zodResolver(NoteCreateInputSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: (data: NoteUpdateInput) => updateNote(note.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate(`/note/${note.id}/`);
    },
  });

  const onSubmit = (data: NoteUpdateInput) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          marginTop: "12px",
        }}
      >
        <label htmlFor="">Title</label>
        <input type="text" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div
        style={{
          marginTop: "12px",
        }}
      >
        <label htmlFor="">Content</label>
        <textarea {...register("content")} rows={6} />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Saving..." : "Submit"}
      </button>
      {status === "error" && <p>Could not save note</p>}
    </form>
  );
}
