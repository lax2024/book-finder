import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import SavedBooks from './pages/SavedBooks';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedBooks />} />
        <Route path="/details/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
