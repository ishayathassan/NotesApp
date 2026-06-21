import { useQuery } from "@tanstack/react-query";
import { Note } from "../schemas/Note";
import { formatDate } from "../utils/formatDate";
import { getAllNotes } from "../api/notes";

export default function Home() {
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[], Error>({ queryKey: ["notes"], queryFn: getAllNotes });
  return (
    <div>
      <h1>All Notes</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}.</p>}
      {notes && <p>{notes.length} notes</p>}

      {notes && (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h4>{note.title}</h4>
              <i>{formatDate(note.created_at)}</i>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
