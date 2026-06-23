import { Note } from "../schemas/Note";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../utils/formatDate";
import { deleteNote, getSingleNote } from "../api/notes";

export default function SingleNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(Number(id)),
  });

  const { mutate, status: deleteStatus } = useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      queryClient.removeQueries(["note", id]);
      navigate(`/`);
    },
  });

  const handleDelete = () => {
    mutate(Number(id));
  };
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}.</p>}
      {note && (
        <div>
          <h2>{note?.title}</h2>
          <i>{formatDate(note?.created_at)}</i>
          <p>{note?.content}</p>
          <Link to={`/note/${note.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete} disabled={deleteStatus === "loading"}>
            {deleteStatus === "loading" ? "Deleting..." : "Delete"}
          </button>
          {deleteStatus === "error" && <p>Could not delete note</p>}
        </div>
      )}
    </div>
  );
}
