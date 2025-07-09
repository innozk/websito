import { useState } from "react";

function Comentarios() {
  // Estado para almacenar la lista de comentarios (se inicializa leyendo localStorage)
  const [comentarios, setComentarios] = useState(() =>
    JSON.parse(localStorage.getItem("comentarios") || "[]")
  );

  // Estado para el texto del comentario que el usuario está escribiendo
  const [texto, setTexto] = useState("");

  // Estado para la cantidad de estrellas seleccionadas (por defecto 5)
  const [estrellas, setEstrellas] = useState(5);

  // Función que se ejecuta al enviar el formulario de comentario
  const enviarComentario = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!texto.trim()) return; // No permite comentarios vacíos

    // Crea un nuevo objeto de comentario
    const nuevoComentario = {
      texto,           // El texto del comentario
      estrellas,       // La cantidad de estrellas seleccionadas
      fecha: new Date().toLocaleString(), // Fecha y hora actual
    };

    // Agrega el nuevo comentario al principio de la lista
    const nuevos = [nuevoComentario, ...comentarios];

    // Actualiza el estado y guarda en localStorage
    setComentarios(nuevos);
    localStorage.setItem("comentarios", JSON.stringify(nuevos));

    // Limpia el formulario
    setTexto("");
    setEstrellas(5);
  };

  return (
    <main className="main-content comentarios-section">
      <h2>Comentarios</h2>
      {/* Formulario para enviar un nuevo comentario */}
      <form onSubmit={enviarComentario} className="comentario-form">
        <label>
          Tu comentario (anónimo):
          <textarea
            value={texto} // Valor actual del textarea
            onChange={e => setTexto(e.target.value)} // Actualiza el estado al escribir
            rows={3}
            required
            maxLength={300}
            placeholder="¡Cuéntanos tu experiencia!"
          />
        </label>
        <label>
          Calificación:
          <span className="estrellas">
            {/* Renderiza 5 estrellas, permite seleccionar la cantidad */}
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                style={{
                  color: n <= estrellas ? "#ffb347" : "#ccc", // Color según selección
                  fontSize: "1.5em",
                  cursor: "pointer"
                }}
                onClick={() => setEstrellas(n)} // Cambia la cantidad de estrellas
                role="button"
                aria-label={`${n} estrellas`}
              >★</span>
            ))}
          </span>
        </label>
        <button type="submit">Enviar comentario</button>
      </form>

      {/* Lista de comentarios ya enviados */}
      <div className="comentarios-list">
        <h3>Opiniones recientes</h3>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún. ¡Sé el primero!</p>
        ) : (
          <ul>
            {comentarios.map((c, idx) => (
              <li key={idx}>
                {/* Muestra las estrellas seleccionadas y las vacías */}
                <span style={{ color: "#ffb347", fontSize: "1.2em" }}>
                  {"★".repeat(c.estrellas)}
                  {"☆".repeat(5 - c.estrellas)}
                </span>
                {/* Muestra el texto del comentario */}
                <span style={{ marginLeft: 8 }}>{c.texto}</span>
                {/* Muestra la fecha del comentario */}
                <div style={{ fontSize: "0.9em", color: "#888" }}>{c.fecha}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Comentarios;