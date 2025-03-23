const express = require('express');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'testdb'
};
//Conexión básica
app.get('/basico', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const startTime = Date.now();

  connection.connect(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        connection.end();
        return res.status(500).json({ error: err.message });
      }
      connection.end();
      const elapsed = Date.now() - startTime;
      res.json({ method: 'basico', timeMs: elapsed, data: results });
    });
  });
});
//Conexión utilizando promesas
app.get('/promesas', async (req, res) => {
  try {
    const startTime = Date.now();
    const connection = await mysqlPromise.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users');
    await connection.end();
    const elapsed = Date.now() - startTime;
    res.json({ method: 'promesas', timeMs: elapsed, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Conexión utilizando Pooling
const pool = mysqlPromise.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
app.get('/pooling', async (req, res) => {
  try {
    const startTime = Date.now();
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    connection.release();
    const elapsed = Date.now() - startTime;
    res.json({ method: 'pooling', timeMs: elapsed, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
