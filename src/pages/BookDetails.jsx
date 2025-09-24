import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();  
  const navigate = useNavigate(); // ✅ For "Back" button

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function stripHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '');
  }

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      setLoading(true); 
      setError(null);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading book details...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  if (!book) return <p style={{ textAlign: "center" }}>Book not found.</p>;

  const { title, authors, description, imageLinks } = book?.volumeInfo || {};

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      
      {/* Navbar */}
      <nav
  className="navbar navbar-light bg-light"
  style={{
    marginBottom: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
  }}
>
  {/* Back Button (Left) */}
  <button
    onClick={() => navigate(-1)}
    style={{
      backgroundColor: "#0099ff",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.95rem",
    }}
  >
    ← Back
  </button>

  {/* Home Button (Right) */}
  <Link to="/" style={{ textDecoration: "none", color: "#0099ff" }}>
    <svg
      style={{ width: "2rem", height: "2rem" }}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-house"
      viewBox="0 0 16 16"
    >
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
    </svg>
  </Link>
</nav>

      {/* Heading */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Book Details
      </h1>

 

      {/* Book Card */}
      <div
        className="card"
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          backgroundColor: "#fff",
        }}
      >
        {imageLinks?.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            style={{
              width: "200px",
              height: "auto",
              margin: "0 auto 1rem",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        )}

        <h2
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            color: "#222",
          }}
        >
          {title || "No Title Available"}
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "1rem",
            marginBottom: "1rem",
            color: "#555",
          }}
        >
          <strong>Author(s):</strong> {authors?.join(', ') || "Unknown Author"}
        </p>

        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#333" }}>
          {description
            ? stripHtmlTags(description)
            : "No description available."}
        </p>
      </div>
    </div>
  );
}

export default BookDetails;


