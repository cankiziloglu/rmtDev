import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useJobItemsContext } from '../lib/hooks';

export default function PaginationControls({
  totalPages,
}: {
  totalPages: number;
}) {
  const { page, setPage } = useJobItemsContext();

  return (
    <section className='pagination'>
      <button
        className={`pagination__button ${
          page === 1 && 'pagination__button--hidden'
        }`}
        onClick={(e) => {
          setPage(page - 1);
          e.currentTarget.blur();
        }}
      >
        <ArrowLeftIcon /> Page {page - 1}
      </button>
      <button
        className={`pagination__button ${
          page > totalPages && 'pagination__button--hidden'
        }`}
        onClick={(e) => {
          setPage(page + 1);
          e.currentTarget.blur();
        }}
      >
        Page {page + 1} <ArrowRightIcon />
      </button>
    </section>
  );
}
