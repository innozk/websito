import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>Comida Coreana Express</h1>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/menu" className="dropdown-toggle">Menú</Link></li>
                    <li><Link to="/about">Sobre Nosotros</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                    <li><Link to="/comentarios">Comentarios</Link></li>
                    <li><Link to="/interes">Comida que te podría interesar</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;