import React, { useState } from 'react';
import BookCard from "../components/BookCard";
import { Link } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#222' }}>Book Finder</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchBooks();
        }}
        style={{ margin: '1rem 0' }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            width: '300px',
            maxWidth: '90%',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '0.5rem',
          }}
          aria-label="Search books"
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#0099ff',
            color: 'white',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Search"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#007acc')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0099ff')}
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && query && (
        <p style={{ color: '#666', marginTop: '2rem' }}>
          No results found for "{query}".
        </p>
      )}

      <div style={{ marginTop: '3rem' }}>
        <Link to="/saved">
          <button
             style={{
            backgroundColor: '#0099ff',
            color: 'white',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
            type="button"
            aria-label="Saved Books"
          >
            Saved Books
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
