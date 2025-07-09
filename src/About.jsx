import cocineroImg from './imagenes/cocinero.png';
import almuerzoImg from './imagenes/almuerzo.png';

function About() {
    return (
        <main className="main-content about-section">
            <h2 className="about-text">Sobre Nosotros</h2>
            <div className="about-content">
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <img
                        src={cocineroImg}
                        alt="Cocinero coreano"
                        className="about-img"
                    />
                    <img
                        src={almuerzoImg}
                        alt="Almuerzo coreano"
                        className="about-img"
                    />
                </div>
                <div className="about-text">
                    <p>
                        <strong>Comida Coreana Express</strong> nació en 2018 en el corazón de Santiago de Chile, cuando la familia Kim decidió compartir los sabores de su tierra natal con la comunidad chilena.
                    </p>
                    <p>
                        Todo comenzó en una pequeña cocina, donde la abuela Sun-Hee preparaba recetas tradicionales como Bibimbap, Kimchi y Tteokbokki para sus amigos y vecinos. Pronto, la pasión y el cariño por la cocina coreana conquistaron a todos, y la noticia se esparció rápidamente.
                    </p>
                    <p>
                        Hoy, Comida Coreana Express es un punto de encuentro para quienes buscan una experiencia auténtica, con ingredientes frescos, atención familiar y un ambiente acogedor. Nos enorgullece ser parte de la diversidad gastronómica de Chile y acercar la cultura coreana a cada mesa.
                    </p>
                    <p>
                        ¡Gracias por ser parte de nuestra historia y permitirnos compartir un pedacito de Corea en cada plato!
                    </p>
                </div>
            </div>
        </main>
    );
}

export default About;