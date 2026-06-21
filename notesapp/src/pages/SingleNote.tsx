import { Note } from "../schemas/Note";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../utils/formatDate";
import { getSingleNote } from "../api/notes";

export default function SingleNote() {
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
      {note && (
        <div>
          <h2>{note?.title}</h2>
          <i>{formatDate(note?.created_at)}</i>
          <p>{note?.content}</p>
        </div>
      )}
    </div>
  );
}
