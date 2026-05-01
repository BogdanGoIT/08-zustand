import axios from 'axios';
import type { CreateNoteProps, Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}

export async function fetchNotes(page: number = 1, search?: string, tag?: string) {
  const res = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// POST /notes {}

export async function createNote(newNote: CreateNoteProps) {
  const res = await axios.post<Note>('/notes', newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// DELETE /notes/{id}

export async function deleteNote(noteId: string) {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
