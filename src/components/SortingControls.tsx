import { useJobItemStore } from '../stores/JobItemStore';

export default function SortingControls() {
  const handleSort = (sortBy: string) => {
    useJobItemStore.setState({ sortBy });
  };

  const sortBy = useJobItemStore((state) => state.sortBy);

  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <button
        onClick={() => handleSort('relevant')}
        className={`sorting__button sorting__button--relevant ${
          sortBy === 'relevant' && 'sorting__button--active'
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => handleSort('recent')}
        className={`sorting__button sorting__button--recent ${
          sortBy === 'recent' && 'sorting__button--active'
        }`}
      >
        Recent
      </button>
    </section>
  );
}
