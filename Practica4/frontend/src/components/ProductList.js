import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ setEditingProduct }) => {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const remove = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      load();
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="list">
      {products.map(p => (
        <div key={p.id} className="item">
          <div>
            <strong>{p.name}</strong> — ${p.price}<br />
            <small>{p.description}</small>
          </div>
          <div>
            <button onClick={() => setEditingProduct(p)}>✏️</button>
            <button onClick={() => remove(p.id)} className="delete">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
