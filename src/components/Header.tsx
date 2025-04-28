
import { Book } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full p-4 bg-book-cream shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="text-book-accent" size={28} />
          <h1 className="text-2xl font-serif font-bold text-book-dark">BookSwipe</h1>
        </div>
        
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <a href="/" className="text-book-dark hover:text-book-accent transition">
                Discover
              </a>
            </li>
            <li>
              <a href="/favorites" className="text-book-dark hover:text-book-accent transition">
                Favorites
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
