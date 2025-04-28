
import { useState } from 'react';
import { Book } from '../types/book';
import { useSwipe } from '../hooks/useSwipe';
import { cn } from '../lib/utils';
import { Check, X, Info, Heart } from 'lucide-react';

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
        "relative w-full max-w-sm aspect-[2/3] bg-white rounded-lg overflow-hidden shadow-md",
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
      {/* Book cover image */}
      <div className="h-3/4 bg-gray-100 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Book details */}
      <div className="p-2 text-center">
        <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>

      {/* Swipe indicators */}
      {swipeDirection === 'left' && (
        <div className="absolute left-4 top-4 bg-blue-500 text-white p-2 rounded-full shadow-md">
          <X size={24} />
        </div>
      )}
      {swipeDirection === 'right' && (
        <div className="absolute right-4 top-4 bg-green-500 text-white p-2 rounded-full shadow-md">
          <Check size={24} />
        </div>
      )}

      {/* Bottom action buttons for the top card */}
      {isTop && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-2 bg-white">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow"
            onClick={handleDislike}
            aria-label="Pass"
          >
            <X size={20} />
          </button>
          
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow"
            aria-label="Info"
          >
            <Info size={20} />
          </button>
          
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow"
            onClick={handleLike}
            aria-label="Like"
          >
            <Check size={20} />
          </button>
          
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white shadow"
            aria-label="Love"
          >
            <Heart size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
