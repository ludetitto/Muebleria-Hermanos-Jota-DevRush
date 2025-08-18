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
2. Ingresar al directorio del proyecto
```bash
cd nombre-del-repo
Instalar las dependencias
```
3. Instalar las dependencias
```bash
npm install
Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con la configuración necesaria:
```
4. Configurar variables de entorno
```bash
MONGO_URI=<cadena-de-conexion-a-MongoDB>
JWT_SECRET=<clave-secreta-para-tokens>
PORT= [puerto-correspondiente]
```
5. Iniciar el servidor backend
```bash
npm run server
Iniciar la aplicación frontend (si está en un directorio separado)
```
6. Iniciar la aplicación frontend (si está en un directorio separado)
```bash
cd client
npm install
npm start
```
La aplicación quedará disponible en:

Frontend: http://localhost:[puerto-correspondiente]

Backend: http://localhost:[puerto-correspondiente]

🏗️ Arquitectura del Proyecto
```plaintext
📦 muebleria-jota
 ┣ 📂 client            # Frontend (React)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 context
 ┃ ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📜 App.js
 ┃ ┃ ┗ 📜 index.js
 ┃ ┗ 📜 package.json
 ┣ 📂 server            # Backend (Node + Express)
 ┃ ┣ 📂 config
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 package.json
 ┣ 📜 .env.example      # Variables de entorno
 ┣ 📜 README.md         # Documentación
 ┗ 📜 package.json      # Dependencias generales
```
👥 Integrantes del Grupo  
De Titto Lucia  
Duran Lucas  
Matias Coppes  
Agostina Torres  
Belen Nolasco

📄 Licencia
Este proyecto se desarrolla con fines educativos en el marco del programa Certificación Avanzada en Full Stack Developer.
