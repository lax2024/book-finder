import { Link } from "react-router-dom";
import { useState } from "react";

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState(() => {
    const books = localStorage.getItem("savedbooks");
    return books ? JSON.parse(books) : [];
  });

  function removeBook(id) {
    const updatedBooks = savedBooks.filter((book) => book.id !== id);
    localStorage.setItem("savedbooks", JSON.stringify(updatedBooks));
    setSavedBooks(updatedBooks);
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* Navigation */}
      <nav
        className="navbar navbar-light bg-light"
        style={{
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <div className="container" style={{ padding: "1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#0099ff" }}>
            <svg
              style={{ width: "8rem", height: "1.5rem" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Saved Books
      </h1>

      {/* Book Grid */}
      {savedBooks.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#888",
            marginTop: "2rem",
          }}
        >
          You haven't saved any books yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {savedBooks.map((book) => {
            const volumeInfo = book.volumeInfo || {};
            const { title, authors, imageLinks } = volumeInfo;

            return (
              <div
                key={book.id}
                className="card"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/details/${book.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={
                      imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150x220?text=No+Image"
                    }
                    alt={title || "No Title"}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: "280px",
                      width: "100%",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      padding: "1rem",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                        color: "#222",
                      }}
                    >
                      {title || "No Title Available"}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        color: "#555",
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {authors?.join(", ") || "Unknown Author"}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => removeBook(book.id)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 0",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "1rem",
                    borderRadius: "0 0 10px 10px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SavedBooks;
