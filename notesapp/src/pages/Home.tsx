import { useQuery } from "@tanstack/react-query";
import { Note } from "../schemas/Note";
import { getAllNotes } from "../api/notes";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import NoteCard from "../components/NoteCard";

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
        <Button variant="contained">Create new note</Button>
      </Link>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}.</p>}
      {notes && <p>{notes.length} notes</p>}

      {notes && (
        <section>
          {notes.map((note) => (
            <Link
              to={`/note/${note.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NoteCard key={note.id} note={note} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
