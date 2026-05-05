import { CreateNoteProps } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// 1. Імпортуємо функцію

type NoteState = {
  draft: CreateNoteProps;
  setDraft: (note: CreateNoteProps) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteProps = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      // 2. Обгортаємо функцію створення стора
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: 'note-draft',
      // Зберігаємо лише властивість draft
      partialize: state => ({ draft: state.draft }),
    }
  )
);
