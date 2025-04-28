
import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { toast } from '@/components/ui/sonner';

interface BookSwipeCardProps {
  books: Book[];
  onLike?: (book: Book) => void;
  onDislike?: (book: Book) => void;
  onEmpty?: () => void;
}

export function BookSwipeCard({ 
  books, 
  onLike, 
  onDislike,
  onEmpty
}: BookSwipeCardProps) {
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    // Initialize with books from props
    if (books && books.length > 0) {
      setCurrentBooks(books);
    }
  }, [books]);
  
  const handleLike = (book: Book) => {
    // Show toast notification with the right format
    toast(`"${book.title}" has been added to your list.`);
    
    // Remove the book from the stack
    setTimeout(() => {
      setCurrentBooks(prev => prev.filter(b => b.id !== book.id));
      if (onLike) onLike(book);
      checkIfEmpty();
    }, 300);
  };
  
  const handleDislike = (book: Book) => {
    // Remove the book from the stack
    setTimeout(() => {
      setCurrentBooks(prev => prev.filter(b => b.id !== book.id));
      if (onDislike) onDislike(book);
      checkIfEmpty();
    }, 300);
  };
  
  const checkIfEmpty = () => {
    if (currentBooks.length <= 1) {
      setTimeout(() => {
        if (onEmpty) onEmpty();
      }, 300);
    }
  };
  
  if (currentBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 h-96">
        <p className="text-xl font-medium text-gray-700">No more books to discover!</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
          onClick={() => setCurrentBooks(books)}
        >
          Start Over
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative h-[60vh] flex flex-col items-center justify-center">
      {currentBooks.slice(-2).map((book, index, array) => (
        <BookCard
          key={book.id}
          book={book}
          onLike={handleLike}
          onDislike={handleDislike}
          isTop={index === array.length - 1}
        />
      ))}
    </div>
  );
}
