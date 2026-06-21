from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.orm import Session
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate


def create_note(db: Session, payload: NoteCreate) -> Note:
    note = Note(**payload.model_dump())
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


def get_note(db: Session, note_id: int) -> Optional[Note]:
    return db.query(Note).filter(Note.id == note_id).first()


def get_notes(
    db: Session,
    user_id: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
) -> list[Note]:
    query = db.query(Note)
    if user_id:
        query = query.filter(Note.user_id == user_id)
    return query.order_by(Note.created_at.desc()).offset(skip).limit(limit).all()


def update_note(db: Session, note: Note, payload: NoteUpdate) -> Note:
    changes = payload.model_dump(exclude_unset=True)
    for field, value in changes.items():
        setattr(note, field, value)
    note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(note)
    return note


def delete_note(db: Session, note: Note) -> None:
    db.delete(note)
    db.commit()
