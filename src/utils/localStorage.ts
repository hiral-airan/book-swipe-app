
import { Book } from "../types/book";

const FAVORITES_KEY = "bookswipe-favorites";

export const getFavoriteBooks = (): Book[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error getting favorite books from localStorage:", error);
    return [];
  }
};

export const addFavoriteBook = (book: Book): void => {
  try {
    const favorites = getFavoriteBooks();
    // Check if book is already in favorites to avoid duplicates
    if (!favorites.some(favorite => favorite.id === book.id)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, book]));
    }
  } catch (error) {
    console.error("Error adding book to favorites:", error);
  }
};

export const removeFavoriteBook = (bookId: string): void => {
  try {
    const favorites = getFavoriteBooks();
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites.filter(book => book.id !== bookId))
    );
  } catch (error) {
    console.error("Error removing book from favorites:", error);
  }
};

export const isFavoriteBook = (bookId: string): boolean => {
  try {
    const favorites = getFavoriteBooks();
    return favorites.some(book => book.id === bookId);
  } catch (error) {
    console.error("Error checking if book is favorite:", error);
    return false;
  }
};
