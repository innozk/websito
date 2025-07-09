import { useState, useEffect } from "react";
import bibimbapImg from './imagenes/Bibimbap.png';
import kimchiImg from './imagenes/kimchi.png';
import tteokbokkiImg from './imagenes/tteokbokki.png';
import bulgogiImg from './imagenes/bulgogi.png';
import japchaeImg from './imagenes/Japchae.png';

// Menús del día con link de origen y datos
const menusDelDia = [
  {
    nombre: "Bibimbap",
    descripcion: "Un plato tradicional coreano con arroz, vegetales y carne.",
    link: "https://blog.remitly.com/es/cultura-y-estilo-de-vida/platosnacional-bibimbap-hechos-fascinantes-corea-del-sur/",
    img: bibimbapImg
  },
  {
    nombre: "Kimchi",
    descripcion: "El famoso fermentado coreano de col y vegetales, picante y saludable.",
    link: "https://www.webconsultas.com/dieta-y-nutricion/dieta-equilibrada/que-es-el-kimchi-origenes-variedades-e-ingredientes",
    img: kimchiImg
  },
  {
    nombre: "Tteokbokki",
    descripcion: "Pasteles de arroz picantes, un snack callejero muy popular en Corea.",
    link: "https://www.onesupermarket.es/blogs/conocimientos/tteokbokki?srsltid=AfmBOor5PlI5gZfyDdHTx-CQhl-_5o9UaXNTLvDVqoLxcMi5x-FfZo1E",
    img: tteokbokkiImg
  },
  {
    nombre: "Bulgogi",
    descripcion: "Carne de res marinada y salteada, dulce y sabrosa.",
    link: "https://kimcmarket.com/blogs/korean-recipes/what-is-korean-bulgogi?srsltid=AfmBOooaqItCzWOcud1hBhWiRHfrarABDIFb8X51cguYC9JS_X_APdt1",
    img: bulgogiImg
  },
  {
    nombre: "Japchae",
    descripcion: "Fideos de batata salteados con verduras y carne.",
    link: "https://www-thespiceodyssey-com.translate.goog/eat/japchae?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
    img: japchaeImg
  }
];

// Genera el siguiente número de carrito basado en sessionStorage
function generarNumeroCarrito() {
  let lastId = parseInt(sessionStorage.getItem("ultimoCarritoId") || "0", 10);
  return lastId + 1;
}

function Menu() {
  // Estado para los productos agregados al carrito actual
  const [carrito, setCarrito] = useState([]);
  // Estado para el número identificador del carrito actual
  const [carritoId, setCarritoId] = useState(generarNumeroCarrito());
  // Estado para la lista de carritos guardados
  const [carritosGuardados, setCarritosGuardados] = useState([]);
  // Estado para mostrar/ocultar la lista de carritos guardados
  const [mostrarGuardados, setMostrarGuardados] = useState(false);
  // Estado para saber si se está editando un carrito guardado (índice)
  const [editandoIdx, setEditandoIdx] = useState(null);
  // Estado para el plato aleatorio de la API
  const [platoApi, setPlatoApi] = useState(null);

  // Al montar el componente, carga el carrito y los carritos guardados desde sessionStorage
  useEffect(() => {
    const guardado = sessionStorage.getItem("carrito");
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
    const guardados = sessionStorage.getItem("carritosGuardados");
    if (guardados) {
      setCarritosGuardados(JSON.parse(guardados));
    }
  }, []);

  // Guarda el carrito actual en sessionStorage cada vez que cambia
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Efecto para obtener un plato aleatorio al cargar el componente
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Korean')
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          setPlatoApi(data.meals[0]);
        }
      });
  }, []);

  // Agrega un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Elimina un producto del carrito por su índice
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  // Limpia el carrito actual y, si no se está editando, genera un nuevo número de carrito
  const limpiarCarrito = () => {
    setCarrito([]);
    sessionStorage.removeItem("carrito");
    setEditandoIdx(null);
    if (editandoIdx === null) {
      setCarritoId(generarNumeroCarrito());
    }
  };

  // Guarda el carrito actual en la lista de carritos guardados
  const guardarCarrito = () => {
    const guardados = JSON.parse(sessionStorage.getItem("carritosGuardados") || "[]");
    const nuevoId = parseInt(sessionStorage.getItem("ultimoCarritoId") || "0", 10) + 1;
    const nuevoGuardado = {
      id: nuevoId,
      productos: carrito,
      total: carrito.reduce((acc, item) => acc + item.precio, 0),
      fecha: new Date().toLocaleString()
    };
    guardados.push(nuevoGuardado);
    sessionStorage.setItem("carritosGuardados", JSON.stringify(guardados));
    sessionStorage.setItem("ultimoCarritoId", nuevoId);
    setCarritosGuardados(guardados);
    alert(`¡Carrito #${nuevoId} guardado con éxito!`);
    limpiarCarrito();
    setCarritoId(nuevoId + 1);
  };

  // Guarda los cambios al editar un carrito guardado
  const guardarEdicion = () => {
    const guardados = JSON.parse(sessionStorage.getItem("carritosGuardados") || "[]");
    guardados[editandoIdx] = {
      ...guardados[editandoIdx],
      productos: carrito,
      total: carrito.reduce((acc, item) => acc + item.precio, 0),
      fecha: new Date().toLocaleString()
    };
    sessionStorage.setItem("carritosGuardados", JSON.stringify(guardados));
    setCarritosGuardados(guardados);
    alert(`¡Carrito #${guardados[editandoIdx].id} editado con éxito!`);
    limpiarCarrito();
  };

  // Calcula el total del carrito actual
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Calcula el menú del día según el día actual
  const menuHoy = menusDelDia[new Date().getDay() % menusDelDia.length];

  // Lista de productos disponibles en el menú
  const productos = [
    {
      id: 1,
      nombre: "Bibimbap",
      precio: 8500,
      img: bibimbapImg
    },
    {
      id: 2,
      nombre: "Kimchi",
      precio: 3500,
      img: kimchiImg
    },
    {
      id: 3,
      nombre: "Tteokbokki",
      precio: 7000,
      img: tteokbokkiImg
    },
    {
      id: 4,
      nombre: "Bulgogi",
      precio: 9500,
      img: bulgogiImg
    },
    {
      id: 5,
      nombre: "Japchae",
      precio: 8000,
      img: japchaeImg
    }
  ];

  return (
    <main className="main-content">
      {/* Menú del día personalizado */}
      <div className="menu-dia-card">
        <img
          src={menuHoy.img}
          alt={menuHoy.nombre}
          className="menu-dia-img"
        />
        <div>
          <h2 className="menu-dia-titulo">
            Menú del día: {menuHoy.nombre}
          </h2>
          <p className="menu-dia-desc">{menuHoy.descripcion}</p>
          <a
            href={menuHoy.link}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-dia-link"
          >
            Ver origen y datos
          </a>
        </div>
      </div>

      <h2>Menú</h2>
      {/* Renderiza las tarjetas de productos */}
      <div className="products">
        {productos.map((prod) => (
          <div className="product-card" key={prod.id}>
            <img src={prod.img} alt={prod.nombre} className="product-img" />
            <h3>{prod.nombre}</h3>
            <span className="price">
              {/* Muestra el precio en formato CLP */}
              {prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </span>
            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Sección del carrito actual */}
      <div className="carrito-section">
        <h3>Carrito #{carritoId}</h3>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {carrito.map((item, idx) => (
              <li key={idx}>
                {item.nombre} - {item.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                <button style={{ marginLeft: 10 }} onClick={() => eliminarDelCarrito(idx)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <p><strong>Total: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong></p>
        <button onClick={limpiarCarrito} disabled={carrito.length === 0}>
          Limpiar carrito
        </button>
        {editandoIdx === null ? (
          <button
            onClick={guardarCarrito}
            disabled={carrito.length === 0}
            style={{ marginLeft: 10 }}
          >
            Guardar carrito
          </button>
        ) : (
          <button
            onClick={guardarEdicion}
            disabled={carrito.length === 0}
            style={{ marginLeft: 10, background: "#ffa500" }}
          >
            Guardar cambios
          </button>
        )}
        <button
          onClick={() => setMostrarGuardados(!mostrarGuardados)}
          style={{ marginLeft: 10 }}
        >
          {mostrarGuardados ? "Ocultar carritos guardados" : "Mostrar carritos guardados"}
        </button>
      </div>

      {/* Lista de carritos guardados, si está activada */}
      {mostrarGuardados && (
        <div className="carritos-guardados-list" style={{ marginTop: 30 }}>
          <h3>Carritos guardados</h3>
          {carritosGuardados.length === 0 ? (
            <p>No hay carritos guardados.</p>
          ) : (
            <ul>
              {carritosGuardados.map((c, idx) => (
                <li key={idx}>
                  <strong>Carrito #{c.id}</strong> ({c.fecha}) - Total: {c.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                  <ul>
                    {c.productos.map((p, i) => (
                      <li key={i}>{p.nombre} - {p.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</li>
                    ))}
                  </ul>
                  <button
                    style={{ marginTop: 5, marginRight: 5 }}
                    onClick={() => {
                      // Carga el carrito guardado para editar
                      setCarrito(c.productos);
                      setCarritoId(c.id);
                      setEditandoIdx(idx);
                      setMostrarGuardados(false);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{ marginTop: 5 }}
                    onClick={() => {
                      // Elimina el carrito guardado
                      const nuevos = carritosGuardados.filter((_, i) => i !== idx);
                      setCarritosGuardados(nuevos);
                      sessionStorage.setItem("carritosGuardados", JSON.stringify(nuevos));
                      if (editandoIdx === idx) limpiarCarrito();
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Nueva tabla del menú */}
      <table className="menu-table">
        <thead>
          <tr>
            <th>Plato</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {platoApi && (
  <div className="api-recomendacion" style={{margin: "24px auto", maxWidth: 540, background: "#e3f2fd", borderRadius: 12, padding: 18, boxShadow: "0 2px 8px rgba(33,150,243,0.10)"}}>
    <h3 style={{marginTop: 0}}>Recomendación aleatoria de la API:</h3>
    <img src={platoApi.strMealThumb} alt={platoApi.strMeal} style={{width: 100, borderRadius: 8}} />
    <p style={{margin: "10px 0 0 0"}}><strong>{platoApi.strMeal}</strong></p>
    <p style={{margin: 0}}>Categoría: {platoApi.strCategory} <br /> Origen: {platoApi.strArea}</p>
    <a href={platoApi.strSource || platoApi.strYoutube} target="_blank" rel="noopener noreferrer">
      Ver receta
    </a>
  </div>
)}

    </main>
  );
}

export default Menu;