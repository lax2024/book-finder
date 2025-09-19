import React, { useState } from 'react';
import BookCard from "../components/BookCard";
import { Link } from 'react-router-dom';


function Home (){
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

    return(
        <div style={{textAlign: 'center'}}>
            <h1>Book Finder</h1>
            <br />
            Search:<input type = "text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for books"></input><button style={{backgroundColor: '#0099ff', color: 'white' }}  onClick={searchBooks} type="submit">Search</button>
             {books.map((book) => (
    <BookCard key={book.id} book={book} />
  ))}
  <br />
  <br />
  <Link to = "/saved"><button style={{width: '10rem',height:'3rem',backgroundColor: '#0099ff', color: 'white',fontSize:"22px" ,borderRadius:'48%',border:'none'}}    type="submit">Saved Books</button></Link>
             
        </div>
    )
}

export default Home;