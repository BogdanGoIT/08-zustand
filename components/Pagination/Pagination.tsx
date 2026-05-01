import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (nextPage: number) => void;
}

export default function Pagination({ totalPages, setPage, page }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        setPage(selected + 1);
      }}
      forcePage={page - 1}
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
