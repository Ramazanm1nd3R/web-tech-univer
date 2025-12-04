import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

function createActivity(type, message) {
  return {
    type,
    message,
    time: new Date().toLocaleString(),
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useLocalStorageArray("products", []);
  const [activity, setActivity] = useLocalStorageArray("admin_activity", []);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", category: "", image: "" });
    setEditingId(null);
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) return;

    if (editingId === null) {
      // create
      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        price: Number(form.price) || 0,
        description: form.description.trim(),
        category: form.category.trim(),
        image: form.image.trim() || "/src/assets/images/cardsjpeg.jpeg"
      };
      const newArr = [newProduct, ...products];
      setProducts(newArr);
      setActivity(prev => [
        createActivity("PRODUCT_CREATED", `Добавлен продукт "${newProduct.name}"`),
        ...prev,
      ]);
    } else {
      // update
      const newArr = products.map(p =>
        p.id === editingId
          ? {
              ...p,
              name: form.name.trim(),
              price: Number(form.price) || 0,
              description: form.description.trim(),
              category: form.category.trim(),
              image: form.image.trim() || p.image
            }
          : p
      );
      setProducts(newArr);
      const edited = newArr.find(p => p.id === editingId);
      setActivity(prev => [
        createActivity("PRODUCT_UPDATED", `Изменён продукт "${edited.name}"`),
        ...prev,
      ]);
    }

    resetForm();
  };

  const onEdit = product => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description || "",
      category: product.category || "",
      image: product.image || ""
    });
  };

  const onDelete = id => {
    const prod = products.find(p => p.id === id);
    if (!window.confirm(`Удалить продукт "${prod?.name}"?`)) return;
    const newArr = products.filter(p => p.id !== id);
    setProducts(newArr);
    setActivity(prev => [
      createActivity("PRODUCT_DELETED", `Удалён продукт "${prod?.name}"`),
      ...prev,
    ]);
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h2>Products Management</h2>
        <p className="muted">Создание, редактирование и удаление продуктов.</p>
      </div>

      <form className="crud-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label>Название</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Название продукта"
            />
          </div>
          <div className="input-group">
            <label>Категория</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Карты, Депозиты, и т.д."
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Цена (₸)</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="0"
            />
          </div>
          <div className="input-group">
            <label>Изображение (URL или путь)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/src/assets/images/..."
            />
          </div>
        </div>
        <div className="input-group">
          <label>Описание</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Краткое описание продукта"
          />
        </div>
        <div className="crud-form__actions">
          <button className="btn btn--primary" type="submit">
            {editingId === null ? "Добавить" : "Сохранить"}
          </button>
          {editingId !== null && (
            <button
              className="btn btn--ghost"
              type="button"
              onClick={resetForm}
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="muted">
                Нет продуктов. Добавьте первый.
              </td>
            </tr>
          )}
          {products.map((p, idx) => (
            <tr key={p.id}>
              <td>{idx + 1}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price > 0 ? p.price.toLocaleString("ru-RU") + " ₸" : "Бесплатно"}</td>
              <td>{p.description}</td>
              <td>
                <button className="table-btn" onClick={() => onEdit(p)}>
                  Edit
                </button>
                <button
                  className="table-btn table-btn--danger"
                  onClick={() => onDelete(p.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
