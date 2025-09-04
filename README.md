# 🪑 E-commerce Mueblería Hermanos Jota  

Este repositorio corresponde al desarrollo del sitio **e-commerce de la Mueblería Hermanos Jota**, como parte de la **Certificación Avanzada en Full Stack Developer**.  
El proyecto sigue una modalidad **ágil** (Sprints), donde se construyen gradualmente tanto el **frontend** como el **backend**, hasta llegar a un despliegue completo en la nube.  

---

## 🚀 Objetivo del Proyecto  
Construir una aplicación web completa (stack MERN: MongoDB, Express, React, Node.js) para simular la experiencia de compra en una mueblería familiar.  
Al finalizar, el sistema contará con:  

- Catálogo de productos.  
- Carrito de compras dinámico.  
- Sistema de registro y login con JWT.  
- Persistencia de datos en MongoDB.  
- Interfaz responsiva y moderna.  
- Despliegue en plataformas cloud (Vercel, Render, MongoDB Atlas).  

---

## 🛠️ Tecnologías y Herramientas  

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, React Router, Context API.  
- **Backend**: Node.js, Express.js.  
- **Base de datos**: MongoDB + Mongoose.  
- **Seguridad**: JSON Web Tokens (JWT), bcrypt.  
- **Colaboración**: Git, GitHub, Slack.  
- **Testing y APIs**: Postman.  
- **Editor**: Visual Studio Code.  

---

## 📚 Plan de Estudios y Sprints  

### Sprint 1: Fundamentos del Frontend  
- HTML semántico.  
- CSS: modelo de cajas, media queries, mobile-first.  

### Sprint 2: Interactividad con JavaScript  
- Variables, funciones, bucles y condicionales.  
- Manipulación del DOM y eventos.  
- Arrays, objetos y JSON.  

### Sprint 3: Fundamentos del Backend (Node.js + Express)  
- Entorno de ejecución de Node.js.  
- Configuración de servidores.  
- Rutas, middlewares y manejo de errores.  

### Sprint 4: Desarrollo Frontend con React  
- JSX y componentes funcionales.  
- Props, estado (useState) y eventos.  
- Renderizado condicional y listas.  

### Sprint 5: Conexión Full Stack y Ruteo  
- Consumo de API desde React (fetch + async/await).  
- React Router DOM (SPA multipágina).  
- Formularios controlados.  

### Sprint 6: Persistencia con MongoDB  
- Operaciones CRUD en MongoDB.  
- Modelado con Mongoose.  
- Relaciones y populate().  

### Sprint 7: Autenticación y Estado Global  
- Registro y login con JWT.  
- Protección de rutas con middlewares.  
- Estado global con Context API.  
- Gestión del carrito de compras.  

### Sprint 8: Despliegue y Consolidación Final  
- Variables de entorno (dotenv).  
- Controladores CRUD (Patrón MVC).  
- Autorización por roles.  
- Despliegue en Vercel, Render y MongoDB Atlas.  

---

## 🖥️ Indicaciones para la Clonación e Instalación  

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:  

1. **Clonar el repositorio**  
```bash
git clone https://github.com/<tu-usuario>/<nombre-del-repo>.git
Ingresar al directorio del proyecto
```

🏗️ Arquitectura del Proyecto
```plaintext
📦 muebleria-jota
 ┣ 📂 assets
 ┃ ┣ 📂 productos
 ┃ ┃ ┣ 📜 Aparador-Uspallata.png
 ┃ ┃ ┣ 📜 background.jpg
 ┃ ┃ ┣ 📜 Biblioteca-Recoleta.png
 ┃ ┃ ┣ 📜 Butaca-Mendoza.png
 ┃ ┃ ┣ 📜 Escritorio-Costa.png
 ┃ ┃ ┣ 📜 Mesa-Comedor-Pampa.png
 ┃ ┃ ┣ 📜 Mesa-de-Centro-Araucaria.png
 ┃ ┃ ┣ 📜 Mesa-de-Noche-Aconcagua.png
 ┃ ┃ ┣ 📜 Silla-de-Trabajo-Belgrano.png
 ┃ ┃ ┣ 📜 Sillas-Cordoba.png
 ┃ ┃ ┣ 📜 Sillon-Copacabana.png
 ┃ ┃ ┗ 📜 Sofa-Patagonia.png
 ┃ ┣ 📜 bg.png
 ┃ ┣ 📜 contact-bg.png
 ┃ ┣ 📜 logo_v2.svg
 ┃ ┣ 📜 logo.svg
 ┃ ┗ 📜 Video institucional Hermanos Jota
 ┣ 📂 css
 ┃ ┣ 📜 contacto.css
 ┃ ┣ 📜 footer.css
 ┃ ┣ 📜 header.css
 ┃ ┣ 📜 home.css
 ┃ ┣ 📜 nosotros.css
 ┃ ┣ 📜 producto.css
 ┃ ┣ 📜 productos.css
 ┃ ┗ 📜 styles.css
 ┣ 📂 js
 ┃ ┣ 📜 carrito.js
 ┃ ┣ 📜 data.js
 ┃ ┣ 📜 destacados.js
 ┃ ┣ 📜 producto.js
 ┃ ┗ 📜 productos.js
 ┣ 📂 pages
 ┃ ┣ 📜 contacto.html
 ┃ ┣ 📜 home.html
 ┃ ┣ 📜 nosotros.html
 ┃ ┣ 📜 producto.html
 ┃ ┗ 📜 productos.html
 ┣ 📜 index.html
 ┣ 📜 boceto.pdf
 ┗ 📜 README.md         # Documentación
```
👥 Integrantes del Grupo  
De Titto Lucia  
Duran Lucas  
Matias Coppes  
Agostina Torres  
Belen Nolasco

📄 Licencia
Este proyecto se desarrolla con fines educativos en el marco del programa Certificación Avanzada en Full Stack Developer.
