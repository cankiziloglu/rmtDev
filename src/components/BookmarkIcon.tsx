import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

export default function BookmarkIcon({ jobId }: { jobId: number }) {

  const { bookmarks, toggleBookmark } = useBookmarksContext();

  const isBookmarked = bookmarks.includes(jobId);

  const handleToggleBookmark = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(jobId);
  }

  return (
    <button onClick={handleToggleBookmark} className="bookmark-btn">
      <BookmarkFilledIcon className={`${isBookmarked && 'filled'}`} />
    </button>
  );
}
