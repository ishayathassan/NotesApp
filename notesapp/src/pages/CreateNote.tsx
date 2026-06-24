import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteCreateInput, NoteCreateInputSchema } from "../schemas/Note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/notes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Input } from "antd";

export default function CreateNote() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteCreateInput>({
    resolver: zodResolver(NoteCreateInputSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: (data: NoteCreateInput) => createNote(data, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
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
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Title" />}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div
          style={{
            marginTop: "12px",
          }}
        >
          <label htmlFor="">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => <Input.TextArea {...field} rows={6} />}
          />
          {errors.content && <p>{errors.content.message}</p>}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={status === "loading"}
          disabled={status === "loading"}
        >
          Create
        </Button>
        {status === "error" && <p>Could not save note</p>}
      </form>
    </div>
  );
}
