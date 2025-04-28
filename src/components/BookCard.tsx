
import { useState } from 'react';
import { Book } from '../types/book';
import { useSwipe } from '../hooks/useSwipe';
import { cn } from '../lib/utils';
import { Check, X } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onLike: (book: Book) => void;
  onDislike: (book: Book) => void;
  isTop?: boolean;
}

export function BookCard({ book, onLike, onDislike, isTop = false }: BookCardProps) {
  const [animation, setAnimation] = useState<string | null>(null);
  
  const handleLike = () => {
    setAnimation('animate-swipe-right');
    onLike(book);
  };

  const handleDislike = () => {
    setAnimation('animate-swipe-left');
    onDislike(book);
  };

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    swipeDirection,
    swipePercentage,
    cardRef
  } = useSwipe({
    onSwipeLeft: handleDislike,
    onSwipeRight: handleLike,
    threshold: 80
  });
  
  const swipeStyle = swipeDirection !== 'none' 
    ? {
        transform: `translateX(${swipePercentage}px) rotate(${swipePercentage * 0.2}deg)`,
        transition: 'transform 0.1s ease-out',
      } 
    : {};

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative w-full max-w-md aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-xl",
        "transition-all duration-300 ease-out",
        isTop ? "z-10" : "z-0 scale-[0.96] -mt-[90%]",
        animation
      )}
      style={swipeDirection !== 'none' ? swipeStyle : undefined}
      onTouchStart={isTop ? handleTouchStart : undefined}
      onTouchMove={isTop ? handleTouchMove : undefined}
      onTouchEnd={isTop ? handleTouchEnd : undefined}
      onMouseDown={isTop ? handleMouseDown : undefined}
      onMouseMove={isTop ? handleMouseMove : undefined}
      onMouseUp={isTop ? handleMouseUp : undefined}
    >
      <div className="absolute inset-0">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Swipe indicators */}
      {swipeDirection === 'left' && (
        <div className="absolute left-4 top-4 bg-book-negative text-white p-2 rounded-full rotate-[-15deg] shadow-md">
          <X size={24} />
        </div>
      )}
      {swipeDirection === 'right' && (
        <div className="absolute right-4 top-4 bg-book-positive text-white p-2 rounded-full rotate-[15deg] shadow-md">
          <Check size={24} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-serif font-bold text-2xl">{book.title}</h3>
        <p className="text-lg opacity-90">by {book.author}</p>
        <p className="text-sm mt-1">{book.publicationYear} • {book.pages} pages</p>
        
        <div className="mt-3 bg-white/10 backdrop-blur-sm rounded p-3">
          <p className="text-sm line-clamp-3">{book.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
            {book.genre}
          </span>
          
          <div className="flex items-center gap-1">
            <span className="text-yellow-300">★</span>
            <span className="text-sm">{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {isTop && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 gap-6">
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg transition transform hover:scale-110"
            onClick={handleDislike}
          >
            <X className="text-book-negative" size={24} />
          </button>
          
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg transition transform hover:scale-110"
            onClick={handleLike}
          >
            <Check className="text-book-positive" size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
