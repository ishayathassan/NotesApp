import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Note } from "../schemas/Note";
import { getSingleNote } from "../api/notes";
import EditNoteForm from "../components/EditNoteForm";

export default function EditNote() {
  const { id } = useParams();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(Number(id)),
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}.</p>}
      {note && <EditNoteForm note={note} />}
    </div>
  );
}
