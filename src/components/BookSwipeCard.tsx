import { useState, useEffect } from "react";
import { useDrag } from '@use-gesture/react';
import { useToast } from "@/hooks/use-toast";
import BookCard from "./BookCard";
import SwipeControls from "./SwipeControls";
import BookDetailDrawer from "./BookDetailDrawer";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  infoLink: string;
}

interface SwipeAreaProps {
  userId: number;
  onSwipeComplete: () => void;
}

const SwipeArea: React.FC<SwipeAreaProps> = ({ userId, onSwipeComplete }) => {
  const { toast } = useToast();
  const [bookQueue, setBookQueue] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://openlibrary.org/subjects/fiction.json?limit=20');
      const data = await res.json();
      const books = (data.works || []).map((item: any) => ({
        id: item.key,
        title: item.title,
        authors: item.authors?.map((a: any) => a.name) || ["Unknown"],
        thumbnail: item.cover_id
          ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
          : '/fallback.png',
        infoLink: `https://openlibrary.org${item.key}`,
      }));
      setBookQueue(prev => [...prev, ...books]);
    } catch (err) {
      console.error("Failed to fetch books", err);
      toast({ variant: "destructive", title: "Error", description: "Unable to fetch new books!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSwipe = async (direction: "left" | "right") => {
    const currentBook = bookQueue[0];
    if (!currentBook) return;

    try {
      // Here you would send swipe info to backend if needed
      console.log(`User ${userId} swiped ${direction} on ${currentBook.title}`);
      
      setBookQueue(prev => prev.slice(1));
      if (bookQueue.length <= 5) {
        fetchBooks(); // Preload more when 5 books left
      }
      
      if (direction === "right") {
        toast({ title: "Added to TBR", description: `"${currentBook.title}" added!` });
      } else {
        toast({ title: "Not Interested", description: `"${currentBook.title}" skipped.` });
      }
      
      if (bookQueue.length === 1) onSwipeComplete();
    } catch (error) {
      console.error("Error during swipe:", error);
    }
  };

  const bind = useDrag(({ movement: [mx], direction: [xDir], velocity, down }) => {
    if (!down && (velocity > 0.2 || Math.abs(mx) > 100)) {
      const dir = xDir > 0 ? "right" : "left";
      handleSwipe(dir as "left" | "right");
    }
  });

  return (
    <div className="relative mx-auto max-w-sm mb-24">
      {bookQueue.length > 0 ? (
        <>
          {bookQueue.map((book, i) => (
            <div key={book.id} {...bind()} style={{ touchAction: 'none' }}>
              <BookCard book={book} index={i} />
            </div>
          ))}
          <SwipeControls
            onSwipeLeft={() => handleSwipe("left")}
            onSwipeRight={() => handleSwipe("right")}
            onShowDetails={() => setDetailsOpen(true)}
          />
          <BookDetailDrawer
            book={bookQueue[0]}
            isOpen={detailsOpen}
            onClose={() => setDetailsOpen(false)}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          {loading ? (
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          ) : (
            <>
              <i className="fas fa-book-open text-4xl text-gray-400 mb-3"></i>
              <p>No more books right now!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SwipeArea;
