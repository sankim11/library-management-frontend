import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { useAuthStore } from '../store/authStore';
import { getBooks } from '../utils/api';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();

      const formattedBooks = fetchedBooks.map((book: Book) => ({
        ...book,
        publishedDate: new Date(book.publishedDate.date).toISOString().split("T")[0], // Extract YYYY-MM-DD
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Library Catalog</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">by {book.author}</p>
              <p className="text-sm text-gray-500 mb-4">{book.author}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Available: {book.availableCopies}/{book.quantity}
                </span>
                <button
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                  onClick={() => {
                    // endpoint: /reservations/create_reservation
                    alert('Reservation feature will be implemented with API integration'); // Remove alert
                  }}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}