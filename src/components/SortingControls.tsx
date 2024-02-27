import { useJobItemsContext } from '../lib/hooks';

export default function SortingControls() {
  const { sortBy, setSortBy } = useJobItemsContext();

  const handleSort = (sortBy: string) => {
    setSortBy(sortBy);
  };

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
