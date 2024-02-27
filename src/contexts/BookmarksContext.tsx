import { createContext } from 'react';
import { useGetBookmarks, useLocalStorage } from '../lib/hooks';
import { JobItem } from '../lib/types';

type BookmarksContextType = {
  bookmarks: number[];
  bookmarkedJobItems: JobItem[];
  isLoading: boolean;
  toggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarks, setBookmarks] = useLocalStorage<number[]>('bookmarks', []);

  const { bookmarkedJobItems, isLoading } = useGetBookmarks(bookmarks);

  const addBookmark = (id: number) => {
    setBookmarks([...bookmarks, id]);
  };
  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== id));
  };

  const toggleBookmark = (id: number) => {
    if (bookmarks.includes(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, bookmarkedJobItems, isLoading, toggleBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
