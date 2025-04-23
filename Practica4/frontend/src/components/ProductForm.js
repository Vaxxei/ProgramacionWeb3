import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ editingProduct, setEditingProduct }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await axios.put(`http://localhost:5000/api/products/${form.id}`, form);
      setEditingProduct(null);
    } else {
      await axios.post('http://localhost:5000/api/products', form);
    }
    setForm({ name: '', price: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: '', price: '', description: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
      <button type="submit">{editingProduct ? 'Actualizar' : 'Agregar'}</button>
      {editingProduct && <button onClick={cancelEdit} type="button" className="cancel">Cancelar</button>}
    </form>
  );
};

export default ProductForm;
