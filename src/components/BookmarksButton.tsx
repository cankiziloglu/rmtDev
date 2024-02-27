import { TriangleDownIcon } from '@radix-ui/react-icons';
import BookmarksPopover from './BookmarksPopover';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../lib/hooks';

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleBookmarksPopover = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside([popoverRef, buttonRef], () => setIsOpen(false));

  return (
    <section>
      <button
        onClick={toggleBookmarksPopover}
        className='bookmarks-btn'
        ref={buttonRef}
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
