
import { useState } from 'react';
import { books } from '../data/books';
import { Book } from '../types/book';
import SwipeArea from '../components/BookSwipeCard';
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-4 px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">BookMatch</h1>
          <p className="text-gray-600 text-sm mt-1">
            Swipe to find your next favorite book
          </p>
        </div>
        
        <div className={isMobile ? "w-full" : "w-1/2 mx-auto"}>
          <BookSwipeCard 
            books={books} 
            onLike={handleLike} 
          />
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white">
                <span className="text-xl">🔍</span>
              </button>
              <span className="text-xs mt-1 text-gray-500">Discover</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700">
                <span className="text-xl">📚</span>
              </button>
              <span className="text-xs mt-1 text-gray-500">TBR</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700">
                <span className="text-xl">📖</span>
              </button>
              <span className="text-xs mt-1 text-gray-500">Read</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700">
                <span className="text-xl">❤️</span>
              </button>
              <span className="text-xs mt-1 text-gray-500">Loved</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
