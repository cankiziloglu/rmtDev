import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useJobItemStore } from '../stores/JobItemStore';

export default function PaginationControls() {
  const page = useJobItemStore((state) => state.page);
  const totalPages = useJobItemStore((state) => state.getTotalPages());

  return (
    <section className='pagination'>
      <button
        className={`pagination__button ${
          page === 1 && 'pagination__button--hidden'
        }`}
        onClick={(e) => {
          useJobItemStore.setState({ page: page - 1 });
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
          useJobItemStore.setState({ page: page + 1 });
          e.currentTarget.blur();
        }}
      >
        Page {page + 1} <ArrowRightIcon />
      </button>
    </section>
  );
}
