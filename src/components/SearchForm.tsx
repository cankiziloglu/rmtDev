
import { useJobItemStore } from '../stores/JobItemStore';

export default function SearchForm() {
  const searchText = useJobItemStore((state) => state.searchText);

  return (
    <form onSubmit={(e) => e.preventDefault} action='#' className='search'>
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => useJobItemStore.setState({ searchText: e.target.value })}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
