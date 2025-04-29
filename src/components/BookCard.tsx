
import { useState } from 'react';
import { Book } from '../types/book';
import { useSwipe } from '../hooks/useSwipe';
import { cn } from '../lib/utils';
import { Check, X, Info, Heart } from 'lucide-react';
import { Badge } from './ui/badge';
import { isFavoriteBook } from '../utils/localStorage';
import { Button } from './ui/button';

interface BookCardProps {
  book: Book;
  onLike: (book: Book) => void;
  onDislike: (book: Book) => void;
  isTop?: boolean;
}

export function BookCard({ book, onLike, onDislike, isTop = false }: BookCardProps) {
  const [animation, setAnimation] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [readStatus, setReadStatus] = useState(false);
  
  const handleLike = () => {
    setAnimation('animate-swipe-right');
    onLike(book);
  };

  export default BookCard;

  const handleDislike = () => {
    setAnimation('animate-swipe-left');
    onDislike(book);
  };
  
  const toggleReadStatus = () => {
    setReadStatus(!readStatus);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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

  const isAlreadyInTBR = isFavoriteBook(book.id);

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

      {/* Status badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        {readStatus && (
          <Badge variant="secondary" className="bg-green-500 text-white">
            <Check size={12} className="mr-1" /> Read
          </Badge>
        )}
        {isAlreadyInTBR && (
          <Badge variant="secondary" className="bg-red-500 text-white">
            <Heart size={12} className="mr-1" /> TBR
          </Badge>
        )}
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
            onClick={toggleDetails}
          >
            <Info size={20} />
          </button>
          
          <button 
            className={`w-10 h-10 flex items-center justify-center rounded-full ${readStatus ? 'bg-green-500' : 'bg-gray-200'} text-${readStatus ? 'white' : 'gray-700'} shadow`}
            onClick={toggleReadStatus}
            aria-label="Mark as Read"
          >
            <Check size={20} />
          </button>
          
          <button 
            className={`w-10 h-10 flex items-center justify-center rounded-full ${isAlreadyInTBR ? 'bg-red-500' : 'bg-gray-200'} text-${isAlreadyInTBR ? 'white' : 'gray-700'} shadow`}
            onClick={handleLike}
            aria-label="Add to TBR"
          >
            <Heart size={20} />
          </button>
        </div>
      )}

      {/* Book details modal */}
      {isTop && showDetails && (
        <div className="absolute inset-0 bg-white p-4 overflow-y-auto flex flex-col">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <button 
              onClick={toggleDetails}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Synopsis */}
            <section>
              <h4 className="font-bold text-lg mb-2">Synopsis</h4>
              <p className="text-sm text-gray-700">{book.description}</p>
            </section>
            
            {/* Price Comparison */}
            <section>
              <h4 className="font-bold text-lg mb-2">Price Comparison</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-gray-500">Amazon</p>
                  <p className="font-bold">${(book.rating * 2 + 5).toFixed(2)}</p>
                  <Button variant="outline" size="sm" className="mt-1 text-xs">View</Button>
                </div>
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-gray-500">Barnes & Noble</p>
                  <p className="font-bold">${(book.rating * 2 + 7).toFixed(2)}</p>
                  <Button variant="outline" size="sm" className="mt-1 text-xs">View</Button>
                </div>
              </div>
            </section>
            
            {/* Top Reviews */}
            <section>
              <h4 className="font-bold text-lg mb-2">Top Reviews</h4>
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-yellow-500">★★★★★</div>
                    <span className="text-xs text-gray-600">by Reader{book.id}A</span>
                  </div>
                  <p className="text-sm">Absolutely loved this book! The characters were so well developed and the plot kept me engaged throughout.</p>
                </div>
                <div className="border-b pb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-yellow-500">★★★★☆</div>
                    <span className="text-xs text-gray-600">by Reader{book.id}B</span>
                  </div>
                  <p className="text-sm">Great read, though the ending felt a bit rushed. Would definitely recommend to friends.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
