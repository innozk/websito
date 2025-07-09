import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Menu from './Menu.jsx';
import Comentarios from './Comentarios.jsx';
import ComidaInteres from './ComidaInteres.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} /> {/* Menú es ahora la página principal */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/interes" element={<ComidaInteres />} /> {/* NUEVA RUTA */}
      </Routes>
      <footer className="footer">
        <p>
          🍜 &copy; 2025 Comida Coreana Express &mdash; ¡Gracias por preferirnos!
        </p>
      </footer>
    </Router>
  );
}

export default App;