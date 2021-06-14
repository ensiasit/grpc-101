const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
  console.log('[REST API] New request on /greet');

  const name = req.query.name || 'World';
  res.json(`Hello ${name}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`[REST API] Server started on port ${PORT}`))