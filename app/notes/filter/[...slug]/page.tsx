// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesByCategoryClient from './Notes.client';
import { Metadata } from 'next';

// /notes виконується Notes на сервері
// виконується queryClient.prefetchQuery
// і відбувається http запит fetchNotes
// результат запиту зберігається в середині queryClient
// За допомогою HydrationBoundary ми передаємо queryClient вкладеним компонентам
// в браузері виконується NotesClient
// Коли викликається перший раз useQuery то не відбувається http запиту, тому що для ['notes', ''] дані вже в queryClient просто бере їх і повертає як data

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  const category = slug[0] === 'all' ? undefined : slug[0];

  const filterLabel = category || 'all';

  const title = `${filterLabel} | NoteHub`;
  const description = `View notes filtered by category: ${filterLabel}.`;

  // Читаємо адресу з .env або беремо localhost
  const baseUrl = process.env.OG_NOTES_URL || 'http://localhost:3000';

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/filter/${filterLabel}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 600,
          alt: `Filter: ${filterLabel}`,
        },
      ],
    },
  };
};

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    // КЛЮЧ МАЄ ПОВНІСТЮ ЗБІГАТИСЯ З КЛІЄНТСЬКИМ
    queryKey: ['notes', 1, '', category],
    queryFn: () => fetchNotes(1, '', category),
  });

  console.log(
    'queryClient.prefetchQuery відбувся на next сервері і дані для [notes, ""] вже є в queryClient'
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByCategoryClient category={category} />
    </HydrationBoundary>
  );
}
