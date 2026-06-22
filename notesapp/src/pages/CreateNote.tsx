import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note, NoteCreateInput, NoteCreateInputSchema } from "../schemas/Note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/notes";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteCreateInput>({
    resolver: zodResolver(NoteCreateInputSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: (data: NoteCreateInput) => createNote(data),
    onSuccess: (newNote) => {
      queryClient.setQueryData<Note[]>(["notes"], (old) =>
        old ? [...old, newNote] : [newNote],
      );
      navigate(`/`);
    },
  });

  const onSubmit = (data: NoteCreateInput) => {
    mutate(data);
  };
  return (
    <div>
      <h1>Create New Note</h1>
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
    </div>
  );
}
