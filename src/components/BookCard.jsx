import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const { title, authors, imageLinks } = book.volumeInfo;
  const [saved, setSaved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Check if book is already saved on mount
    let savedData = localStorage.getItem("savedbooks")
      ? JSON.parse(localStorage.getItem("savedbooks"))
      : [];

    const bookExists = savedData.some((savedBook) => savedBook.id === book.id);
    setSaved(bookExists);
  }, [book.id]);

  function onButtonClick(book) {
    let savedData = localStorage.getItem("savedbooks")
      ? JSON.parse(localStorage.getItem("savedbooks"))
      : [];

    const bookExists = savedData.some((savedBook) => savedBook.id === book.id);

    if (!bookExists) {
      savedData.push(book);
      localStorage.setItem("savedbooks", JSON.stringify(savedData));
      setSaved(true);
      setShowMessage(true);

      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <Link
          to={`/details/${book.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={imageLinks?.thumbnail}
            alt={title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{authors?.join(", ")}</p>
          </div>
        </Link>
        <button
          style={{
            backgroundColor: saved ? "gray" : "#0099ff",
            color: "white",
            cursor: saved ? "not-allowed" : "pointer",
          }}
          onClick={() => onButtonClick(book)}
          type="button"
          disabled={saved}
        >
          {saved ? "Saved" : "Save"}
        </button>
        {showMessage && (
          <p style={{ color: "green", marginTop: "0.5rem" }}>Book saved!</p>
        )}
      </div>
    </div>
  );
}

export default BookCard;


