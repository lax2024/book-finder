function BookCard({book}) {
    const {title,authors,imageLinks} = book.volumeInfo
  return (
    
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <img src= {imageLinks?.thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
           {authors}
          </p>
          <a href="#" className="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  );
}

export default BookCard;