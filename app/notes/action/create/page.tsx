import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

// Читаємо адресу з .env або беремо localhost
const baseUrl = process.env.OG_NOTES_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Creating a new note | NoteHub',
  description: 'Add a new idea or work task to your list in NoteHub.',

  openGraph: {
    title: 'Creating a new note | NoteHub',
    description: 'A convenient editor for your notes. Your ideas are saved automatically.',
    url: `${baseUrl}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 600,
        alt: 'NoteHub Preview',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* NoteForm component */}
        <NoteForm />
      </div>
    </main>
  );
}
