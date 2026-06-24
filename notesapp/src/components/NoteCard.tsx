import { Note } from "../schemas/Note";
import { Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../utils/formatDate";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
          {formatDate(note.created_at)}
        </Typography>
        <Typography variant="body2">{note.content}</Typography>
      </CardContent>
    </Card>
  );
}
