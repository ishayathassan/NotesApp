from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.auth import get_current_user
from app.database import get_db
from app.schemas.note import NoteCreate, NoteResponse, NoteUpdate
import app.crud.notes as crud

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("/", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_note(
    payload: NoteCreate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    return crud.create_note(db, payload, current_user_id)


@router.get("/", response_model=list[NoteResponse])
def list_notes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    return crud.get_notes(db, user_id=current_user_id, skip=skip, limit=limit)


@router.get("/{note_id}", response_model=NoteResponse)
def get_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    note = crud.get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    if note.user_id != str(current_user_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    return note


@router.patch("/{note_id}", response_model=NoteResponse)
def update_note(
    note_id: int,
    payload: NoteUpdate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    note = crud.get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    if note.user_id != str(current_user_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.update_note(db, note, payload)


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user),
):
    note = crud.get_note(db, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    if note.user_id != str(current_user_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    crud.delete_note(db, note)
