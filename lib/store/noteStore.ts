import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FormValue = {
  title?: string;
  content?: string;
  tag?: NoteTag;
};

type NoteState = {
  draft: FormValue;
  setDraft: (note: FormValue) => void;
  clearDraft: () => void;
};

const initialDraft: FormValue = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,

      // Функція для оновлення полів (використовуємо спред ..., щоб оновлювати частинами)
      setDraft: note =>
        set(state => ({
          draft: { ...state.draft, ...note },
        })),

      // Функція для очищення до початкового стану
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', // назва ключа в localStorage
    }
  )
);
