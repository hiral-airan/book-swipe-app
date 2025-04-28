
import { useState, useRef, useEffect } from 'react';

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeHandlers {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  swipeDirection: 'none' | 'left' | 'right';
  swipePercentage: number;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function useSwipe({
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  threshold = 100
}: UseSwipeProps = {}): SwipeHandlers {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'none' | 'left' | 'right'>('none');
  const [swipePercentage, setSwipePercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swiping || startX === null) return;
    const currentPosition = e.touches[0].clientX;
    setCurrentX(currentPosition);
    
    const distance = currentPosition - startX;
    const cardWidth = cardRef.current?.offsetWidth || 200;
    const percentageMoved = (distance / cardWidth) * 100;
    setSwipePercentage(Math.min(Math.max(percentageMoved, -100), 100));
    
    if (distance > 0) {
      setSwipeDirection('right');
    } else if (distance < 0) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection('none');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!swiping || startX === null) return;
    const currentPosition = e.clientX;
    setCurrentX(currentPosition);
    
    const distance = currentPosition - startX;
    const cardWidth = cardRef.current?.offsetWidth || 200;
    const percentageMoved = (distance / cardWidth) * 100;
    setSwipePercentage(Math.min(Math.max(percentageMoved, -100), 100));
    
    if (distance > 0) {
      setSwipeDirection('right');
    } else if (distance < 0) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection('none');
    }
  };

  const handleTouchEnd = () => {
    if (!swiping || startX === null || currentX === null) return;
    
    const distance = currentX - startX;
    if (distance > threshold) {
      onSwipeRight();
    } else if (distance < -threshold) {
      onSwipeLeft();
    }
    
    resetSwipeState();
  };

  const handleMouseUp = () => {
    if (!swiping || startX === null || currentX === null) return;
    
    const distance = currentX - startX;
    if (distance > threshold) {
      onSwipeRight();
    } else if (distance < -threshold) {
      onSwipeLeft();
    }
    
    resetSwipeState();
  };

  const resetSwipeState = () => {
    setSwiping(false);
    setStartX(null);
    setCurrentX(null);
    setSwipeDirection('none');
    setSwipePercentage(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (swiping) {
        resetSwipeState();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [swiping]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    swipeDirection,
    swipePercentage,
    cardRef
  };
}
