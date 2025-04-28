
import { Book } from "../types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description: "Set in the American South during the 1930s, the novel tells the story of a young girl named Scout Finch, whose father, Atticus, a lawyer, defends a Black man falsely accused of raping a white woman.",
    genre: "Literary Fiction",
    rating: 4.7,
    pages: 324,
    publicationYear: 1960
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop",
    description: "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives. The novel follows the life of Winston Smith, a low-ranking member of the Party.",
    genre: "Dystopian Fiction",
    rating: 4.6,
    pages: 328,
    publicationYear: 1949
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1531386450450-969f935bd522?q=80&w=800&auto=format&fit=crop",
    description: "A romantic novel that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    genre: "Classic Romance",
    rating: 4.5,
    pages: 432,
    publicationYear: 1813
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1610882648335-eda27ee3b4b9?q=80&w=800&auto=format&fit=crop",
    description: "Set in the Jazz Age, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.",
    genre: "Literary Fiction",
    rating: 4.3,
    pages: 180,
    publicationYear: 1925
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=800&auto=format&fit=crop",
    description: "The adventure of Bilbo Baggins, a hobbit who is hired as a \"burglar\" by a group of dwarves seeking to reclaim their mountain home and treasure from the dragon Smaug.",
    genre: "Fantasy",
    rating: 4.8,
    pages: 310,
    publicationYear: 1937
  },
  {
    id: "6",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    coverImage: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=800&auto=format&fit=crop",
    description: "The journey of Harry Potter, an orphan brought up by his unfriendly relatives who learns on his 11th birthday that he is actually a wizard and has been invited to attend Hogwarts School of Witchcraft and Wizardry.",
    genre: "Fantasy",
    rating: 4.9,
    pages: 309,
    publicationYear: 1997
  }
];
