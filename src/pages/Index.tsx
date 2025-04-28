
import { useState } from 'react';
import { books } from '../data/books';
import { Book } from '../types/book';
import { BookSwipeCard } from '../components/BookSwipeCard';
import { Header } from '../components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { addFavoriteBook } from '../utils/localStorage';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const isMobile = useIsMobile();

  const handleLike = (book: Book) => {
    setLikedBooks(prev => [...prev, book]);
    // Save to localStorage
    addFavoriteBook(book);
    toast(`Added "${book.title}" to favorites!`);
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-book-dark">
            Discover Your Next Read
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Swipe right to like, left to pass
          </p>
        </div>
        
        <div className={isMobile ? "w-full" : "w-2/3 mx-auto"}>
          <BookSwipeCard 
            books={books} 
            onLike={handleLike} 
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {books.length} books available for discovery
          </p>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-book-cream text-center text-sm text-gray-600">
        <p>BookSwipe - Find your next favorite book</p>
      </footer>
    </div>
  );
};

export default Index;
