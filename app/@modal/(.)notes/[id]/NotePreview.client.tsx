'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleBack = () => router.back();

  return (
    <Modal onClose={handleBack}>
      {isLoading && <p>Loading note details...</p>}
      {isError && <p>Failed to load note. Please try again later.</p>}
      {note && (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.tag}</p>
          <p>{note.createdAt}</p>
          <button onClick={handleBack}>Close</button>
        </>
      )}
    </Modal>
  );
}
