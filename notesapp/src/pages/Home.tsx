import { useQuery } from "@tanstack/react-query";
import { Note } from "../schemas/Note";
import { formatDate } from "../utils/formatDate";
import { getAllNotes } from "../api/notes";
import { Link } from "react-router-dom";

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

      <Link
        to="/create-note"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button>Create new note</button>
      </Link>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}.</p>}
      {notes && <p>{notes.length} notes</p>}

      {notes && (
        <ul>
          {notes.map((note) => (
            <Link
              to={`/note/${note.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li
                key={note.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "12px",
                  listStyle: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h4 style={{ margin: "0 0 4px 0" }}>{note.title}</h4>
                <i style={{ fontSize: "0.8rem", color: "#888" }}>
                  {formatDate(note.created_at)}
                </i>
                <p style={{ margin: "8px 0 0 0" }}>{note.content}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
