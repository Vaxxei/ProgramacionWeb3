const db = require('../models/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createProduct = (req, res) => {
  const { name, price, description } = req.body;
  db.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, name, price, description });
    }
  );
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, name, price, description });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(204).end();
  });
};


