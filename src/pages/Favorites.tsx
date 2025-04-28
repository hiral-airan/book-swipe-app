
import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { Header } from '../components/Header';
import { getFavoriteBooks, removeFavoriteBook } from '../utils/localStorage';
import { toast } from '@/components/ui/sonner';
import { Trash2 } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  
  useEffect(() => {
    // Load favorites from localStorage
    const loadedFavorites = getFavoriteBooks();
    setFavorites(loadedFavorites);
  }, []);

  const handleRemove = (bookId: string) => {
    removeFavoriteBook(bookId);
    setFavorites(prev => prev.filter(book => book.id !== bookId));
    toast('Book removed from favorites');
  };

  return (
    <div className="min-h-screen bg-book-paper">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-serif font-bold text-book-dark mb-8">
          Your Favorite Books
        </h2>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              You haven't added any favorites yet. 
              Start swiping to discover new books!
            </p>
            <a 
              href="/" 
              className="mt-4 inline-block px-5 py-3 bg-book-accent text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
              Discover Books
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map(book => (
              <div 
                key={book.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.02]"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={book.coverImage} 
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => handleRemove(book.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl mb-2">{book.title}</h3>
                  <p className="text-gray-700">by {book.author}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{book.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-4 text-sm line-clamp-3">{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="mt-auto py-6 bg-book-cream text-center text-sm text-gray-600">
        <p>BookSwipe - Find your next favorite book</p>
      </footer>
    </div>
  );
};

export default Favorites;
