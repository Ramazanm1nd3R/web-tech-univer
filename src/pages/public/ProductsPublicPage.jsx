import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function ProductsPublicPage() {
  const [products] = useLocalStorageArray("products", [
    {
      id: 1,
      name: "Карты",
      image: "/src/assets/images/cardsjpeg.jpeg",
      description: "Дебетовые и кредитные карты с кешбэком до 10%",
      price: 0,
      category: "Карты"
    },
    {
      id: 2,
      name: "Депозиты",
      image: "/src/assets/images/deposit.jpg",
      description: "Надежные вклады с доходностью до 14.5% годовых",
      price: 0,
      category: "Депозиты"
    },
    {
      id: 3,
      name: "Ипотека",
      image: "/src/assets/images/ipoteka.jpeg",
      description: "Ипотечные программы от 6.9% годовых",
      price: 0,
      category: "Ипотека"
    },
    {
      id: 4,
      name: "Инвестиции",
      image: "/src/assets/images/invest.jpeg",
      description: "Инвестиционные портфели для роста капитала",
      price: 0,
      category: "Инвестиции"
    }
  ]);

  const [cart, setCart] = useLocalStorageArray("cart", []);
  const [filter, setFilter] = useState("Все");

  const categories = ["Все", ...new Set(products.map(p => p.category))];

  const filteredProducts = filter === "Все"
    ? products
    : products.filter(p => p.category === filter);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} добавлен в корзину!`);
  };

  return (
    <>
      <div className="snow-container" id="snow"></div>

      <header className="nav glass">
        <div className="container nav__inner">
          <Link className="brand" to="/">Roma<span>Credit</span>Bank</Link>

          <nav className="menu">
            <Link to="/" className="menu__link">Главная</Link>
            <Link to="/products" className="menu__link active">Продукты</Link>
          </nav>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/register" className="btn btn--primary">Регистрация</Link>
            <button className="btn btn--ghost">🛒 Корзина ({cart.length})</button>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "120px" }}>
        <div className="container">
          <h2 className="section__title">Все продукты</h2>

          <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn ${filter === cat ? 'btn--primary' : 'btn--ghost'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid--cards">
            {filteredProducts.map(product => (
              <div key={product.id} className="card glass">
                <img src={product.image} alt={product.name} className="card__img" />
                <div className="card__body">
                  <h3 className="card__title">{product.name}</h3>
                  <p className="card__text">{product.description}</p>
                  {product.price > 0 && (
                    <p style={{ fontSize: "1.25rem", fontWeight: "bold", margin: "0.5rem 0" }}>
                      {product.price.toLocaleString()} ₸
                    </p>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn--primary"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <p>© 2025 RomaCreditBank. Все права защищены.</p>
        </div>
      </footer>

      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>
    </>
  );
}
