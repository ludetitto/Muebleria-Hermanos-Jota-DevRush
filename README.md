# 🪑 E-commerce Mueblería Hermanos Jota  

Este repositorio corresponde al desarrollo del sitio **e-commerce de la Mueblería Hermanos Jota**, como parte de la **Certificación Avanzada en Full Stack Developer**.  
El proyecto sigue una modalidad **ágil** (Sprints), donde se construyen gradualmente tanto el **frontend** como el **backend**, hasta llegar a un despliegue completo en la nube.  

[Link a la pagina web](https://capable-rugelach-28f3b6.netlify.app/pages/home.html)
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

### ▶️ Ejecutar localmente

1. Instala dependencias (si no lo hiciste todavía):

```powershell
# En la raíz del repo (opcional)
cd "c:\..\Muebleria-Hermanos-Jota-DevRush"

# Backend
cd backend
npm install

# Frontend
cd ..\client
npm install
```

2. Ejecuta backend y frontend en dos terminales separadas:

```powershell
# Terminal 1: levantar backend (API)
cd backend
npm start

# Terminal 2: levantar frontend (React dev server)
cd client
npm start
```

3. Abre la aplicación en el navegador (CRA suele abrir en):

http://localhost:3000

Nota importante — por qué "levantar solo el backend" funciona en desarrollo y producción
----------------------------------------------------------------------

Si previamente ejecutas `cd client && npm run build`, Create React App genera una carpeta estática `client/build` con los archivos HTML/CSS/JS optimizados. El backend (en `backend/index.js`) está preparado para servir esos archivos estáticos y además devuelve `index.html` como fallback para cualquier ruta GET no-API (comportamiento típico de una SPA).

Por eso, si existe `client/build` podes levantar únicamente el backend (`cd backend && npm start`) y el servidor servirá la interfaz React desde el mismo origen (mismo host y puerto) que la API. Al compartir origen la comunicación entre frontend y backend ocurre sin restricciones CORS, porque el navegador no considera la petición como cross-origin.

Pasos rápidos para usar este flujo (build + backend):

```powershell
# 1) Generar el build en la carpeta client/build
cd client
npm install      # (si no se hizo antes)
npm run build

# 2) Arrancar solo el backend (servirá los archivos estáticos y la API)
cd ..\backend
npm install      # (si no se hizo antes)
npm start

# Entonces abre en el navegador (ejemplo):
http://localhost:3000
```

🏗️ Arquitectura del Proyecto

```
Muebleria-Hermanos-Jota-DevRush/
├─ backend/                  # Server Express + API
│  ├─ index.js               # Entrada del servidor
│  ├─ package.json
│  └─ src/
│     ├─ routes/
│     │  └─ productos.js     # Rutas API para productos
│     └─ data/
│        └─ data.js          # Datos de ejemplo usados por la API
├─ client/                   # Frontend (Create React App)
│  ├─ package.json
│  ├─ public/                # Archivos estáticos servidos (favicons, assets, imágenes)
│  │  └─ assets/
│  │     └─ productos/       # Imágenes de productos usadas por la SPA
│  └─ src/                   # Código fuente React
│     ├─ components/
│     ├─ pages/
│     ├─ hooks/
│     └─ assets/
├─ assets/                   # Activos compartidos (imágenes, logo, etc.)
|_ README.md                 # Documentación del proyecto
```

👥 Integrantes del Grupo  
De Titto Lucia  
Duran Lucas  
Matias Coppes  
Agostina Torres  
Belen Nolasco

📄 Licencia
Este proyecto se desarrolla con fines educativos en el marco del programa Certificación Avanzada en Full Stack Developer.
