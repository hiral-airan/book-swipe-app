
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Book } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-book-paper">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Book className="text-book-accent h-20 w-20" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4 text-book-dark">404</h1>
        <p className="text-xl text-gray-600 mb-6">This page seems to be missing from our library</p>
        <a href="/" className="text-book-accent hover:text-opacity-80 underline font-medium">
          Return to Bookshelf
        </a>
      </div>
    </div>
  );
};

export default NotFound;
