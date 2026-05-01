'use client';

import css from './NotesPage.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';

type Props = {
  category?: string;
};

export default function NotesClient({ category }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log(
    'Тут useQuery при монтуванні просто використало дані із кеша QueryClient для  [notes, ""]'
  );

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, search, category],
    queryFn: () => fetchNotes(currentPage, search, category),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1); // Скидаємо сторінку тут, це безпечно і не викликає каскадних рендерів
  }, 300);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox value={search} onSearch={handleSearch} />
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setCurrentPage} page={currentPage} />
        )}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onEnd={closeModal} />
        </Modal>
      )}
    </div>
  );
}
