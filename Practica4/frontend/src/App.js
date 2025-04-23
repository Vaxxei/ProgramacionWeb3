import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './index.css';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="container">
      <h1>🛍️ CRUD de Productos</h1>
      <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
      <ProductList setEditingProduct={setEditingProduct} />
    </div>
  );
}

export default App;
