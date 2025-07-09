## Como Instalar repositorio
### Paso 1 Instalacion de Node.js
se necesita instalar Node.js version 20.19.3
### Paso 2 descargar y descomprimir
descargar el archivo .ZIP y descomprimirlo
### Paso 3 Instalar y ejecutar NPM
el archivo utilizarlo en un interprete como Visual Estudios y abrir terminal, en la terminal ejecutar comando de "npm Install"
luego de instalar todo solo es necesario utilizar el comando "npm start" y listo!

### Datos a tomar encuenta
# CARPETA SRC
## APP.JSX
en este .jsx se encuentra todas las importaciones y el nucleo de la app. en este mismo se encuentra los Route path, para la redireccion de la misma pagina, junto al pie de pagina que es el Footer.
## Menu.JSX
de la linea 1 a la 6 se encuentra las importaciones de las imagenes que estan en la carpeta "imagenes"
Linea 9-40 es para agregar platos del dia junto a una descripcion y link. este va ir variando dependiendo del dia"aun falta testar este ultimo"
Linea 42-46 se encuentra el SessionStorage, donde se guardan los pedidos del carrito, todo esto en numerado por un ID que se ira sumando con el ultimo id hecho.
de aqui en adelante el codigo esta totalmente comentado.

## Header.jsx
es la cabezera donde esta en una lista.
## Contact.jsx
lo unico relevante para este apartado es el mapa. donde se encuentra en la linea 70 y 71, donde se hace un borde y un link para que se pueda visualizar un mapa de google.

## ComidaInteres.JSX
en este apartado de encuentra el QUERY de themealdb, aca se utiliza para una comida aleatoria.

## Comentarios.jsx
la mayor parte esta comentada, aca se ve los comentarios del usuario y todo esto guardados en el local storage que es se ve en la linea 5-7

## About.jsx
no se encuentra nada relevante mas alla de un bonito "sobre nosotros"

## App.css
este es css extenso que se dividen por comentarios, los comentarios hasta abajo dicen que apartado afecta, para no confundir.
