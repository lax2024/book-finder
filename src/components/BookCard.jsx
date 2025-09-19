import { Link } from "react-router-dom";

function BookCard({book}) {
    const {title,authors,imageLinks} = book.volumeInfo
        function onButtonClick(book) {
 
  let savedData = localStorage.getItem('savedbooks') ? JSON.parse(localStorage.getItem('savedbooks')) : []
  
  const bookExists = savedData.some(savedBook => savedBook.id === book.id);

  if (!bookExists) {
    savedData.push(book)
  }

 
  localStorage.setItem('savedbooks', JSON.stringify(savedData))
}
  return (
    
    <div>
    <div className="card" style={{ width: '18rem' }}>
  <Link to={`/details/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <img src={imageLinks?.thumbnail} alt={title} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{authors?.join(', ')}</p>
    </div>
  </Link>
  <button
    style={{ backgroundColor: '#0099ff', color: 'white' }}
    onClick={() => onButtonClick(book)}
    type="button"
  >
    Save
  </button>
</div>


        </div>
      
    
  );
}

export default BookCard;