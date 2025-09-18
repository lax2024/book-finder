import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import SavedBooks from './pages/SavedBooks';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
