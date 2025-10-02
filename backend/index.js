const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// middleware de logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// endpoint de prueba
app.get('/api/health', (req, res) => {
  res.json({ ok: true, msg: 'backend arriba' });
});

app.listen(PORT, () => console.log(`Server corriendo en: ${PORT}`));
