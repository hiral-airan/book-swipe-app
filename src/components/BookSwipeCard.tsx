
import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { toast } from '@/components/ui/use-toast';

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
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    setCurrentBooks(books);
  }, [books]);
  
  const handleLike = (book: Book) => {
    setLikedBooks(prev => [...prev, book]);
    
    // Show toast notification
    toast({
      title: "Added to favorites!",
      description: `"${book.title}" has been added to your favorites.`,
      duration: 3000,
    });
    
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
        <p className="text-xl font-serif text-book-dark">No more books to discover!</p>
        <button 
          className="px-4 py-2 bg-book-accent text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
          onClick={() => setCurrentBooks(books)}
        >
          Start Over
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative h-[70vh] flex flex-col items-center justify-center p-4">
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
