const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Servidor backend corriendo en http://localhost:5000');
});
