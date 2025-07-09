import { useState } from "react";

function Contact() {
  // Estado para los mensajes guardados
  const [mensajes, setMensajes] = useState(() =>
    JSON.parse(localStorage.getItem("mensajesContacto") || "[]")
  );
  // Estados para los campos del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    promos: false,
    fecha: new Date().toLocaleDateString(),
    mensaje: ""
  });

  // Maneja cambios en los campos del formulario
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Envía el formulario y guarda el mensaje en localStorage
  const handleSubmit = e => {
    e.preventDefault();
    const nuevo = { ...form, id: Date.now() };
    const nuevosMensajes = [nuevo, ...mensajes];
    setMensajes(nuevosMensajes);
    localStorage.setItem("mensajesContacto", JSON.stringify(nuevosMensajes));
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      motivo: "",
      promos: false,
      fecha: new Date().toLocaleDateString(),
      mensaje: ""
    });
  };

  // Elimina un mensaje por id
  const eliminarMensaje = id => {
    const nuevos = mensajes.filter(m => m.id !== id);
    setMensajes(nuevos);
    localStorage.setItem("mensajesContacto", JSON.stringify(nuevos));
  };

  return (
    <main className="main-content contact-section">
      <h2>Contacto</h2>
      <div className="contact-card">
        <p>Puedes encontrarnos y hacer tus pedidos a través de los siguientes medios:</p>
        <ul>
          <li><strong>Dirección:</strong> Calle Corea 123, Santiago, Chile</li>
          <li><strong>Teléfono:</strong> +56 9 1234 5678</li>
          <li><strong>Email:</strong> contacto@comidacoreana.com</li>
          <li><strong>WhatsApp:</strong> +56 9 1234 5678</li>
          <li><strong>Horario:</strong> Lunes a Sábado, 11:00 a 22:00</li>
        </ul>
        <p className="contact-msg">¡Te esperamos para que disfrutes de la mejor comida coreana!</p>
      </div>
      <div className="contact-map">
        <iframe
          title="Ubicación Comida Coreana Express"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-70.6483,-33.4569,-70.6483,-33.4569&amp;layer=mapnik"
          style={{ border: 0, width: "100%", height: "220px", borderRadius: "10px", marginTop: "18px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="number" name="telefono" value={form.telefono} onChange={handleChange} required />
        </label>
        <label>
          Motivo:
          <select name="motivo" value={form.motivo} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="consulta">Consulta</option>
            <option value="reclamo">Reclamo</option>
            <option value="felicitacion">Felicitación</option>
          </select>
        </label>
        <label>
          ¿Desea recibir promociones?
          <input type="checkbox" name="promos" checked={form.promos} onChange={handleChange} />
        </label>
        <label>
          Fecha de envío:
          <input type="text" value={form.fecha} readOnly />
        </label>
        <label>
          Mensaje:
          <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
        </label>
        <button type="submit">Enviar</button>
      </form>

      {/* Lista de mensajes enviados */}
      <div style={{ marginTop: 32 }}>
        <h3>Mensajes enviados</h3>
        {mensajes.length === 0 ? (
          <p>No hay mensajes enviados.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {mensajes.map(m => (
              <li key={m.id} style={{
                background: "#fff9c4",
                borderRadius: 8,
                marginBottom: 14,
                padding: "12px 14px",
                boxShadow: "0 1px 4px rgba(255,183,77,0.10)"
              }}>
                <strong>{m.nombre}</strong> ({m.email})<br />
                <span>Tel: {m.telefono} | Motivo: {m.motivo} | Promos: {m.promos ? "Sí" : "No"}</span><br />
                <span>Fecha: {m.fecha}</span>
                <div style={{ margin: "8px 0" }}>{m.mensaje}</div>
                <button
                  style={{
                    background: "#ff7043",
                    color: "#fff",
                    border: "none",
                    padding: "5px 12px",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                  onClick={() => eliminarMensaje(m.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Contact;