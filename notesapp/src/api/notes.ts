import axios from "axios";
import { instance } from "../App";
import { Note, noteSchema } from "../schemas/Note";

export const getSingleNote = async (noteId: number): Promise<Note> => {
  try {
    const response = await instance.get(`/notes/${noteId}`);
    return noteSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};

export const getAllNotes = async (): Promise<Note[]> => {
  try {
    const response = await instance.get("/notes");
    return noteSchema.array().parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};
