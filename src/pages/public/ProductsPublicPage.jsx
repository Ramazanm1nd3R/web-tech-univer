import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function ProductsPublicPage() {
  const [products] = useLocalStorageArray("products", [
    {
      id: 1,
      name: "Premium Card",
      image: "/src/assets/cardsjpeg.jpeg",
      description: "Дебетовая карта с кешбэком до 10%",
      price: 0,
      category: "Карты",
      link: "/cards"
    },
    {
      id: 2,
      name: "Gold Card",
      image: "/src/assets/cardsjpeg.jpeg",
      description: "Кредитная карта с лимитом до 1 млн ₸",
      price: 0,
      category: "Карты",
      link: "/cards"
    },
    {
      id: 3,
      name: "Депозит Classic",
      image: "/src/assets/deposit.jpg",
      description: "Надежный вклад с доходностью до 14.5% годовых",
      price: 0,
      category: "Депозиты",
      link: "/products"
    },
    {
      id: 4,
      name: "Депозит Premium",
      image: "/src/assets/deposit.jpg",
      description: "Премиальный вклад с высокой доходностью",
      price: 0,
      category: "Депозиты",
      link: "/products"
    },
    {
      id: 5,
      name: "Потребительский кредит",
      image: "/src/assets/ipoteka.jpeg",
      description: "Кредит на любые цели от 12.9%",
      price: 0,
      category: "Кредиты",
      link: "/loans"
    },
    {
      id: 6,
      name: "Автокредит",
      image: "/src/assets/ipoteka.jpeg",
      description: "Кредит на автомобиль от 8.9%",
      price: 0,
      category: "Кредиты",
      link: "/loans"
    },
    {
      id: 7,
      name: "Ипотека",
      image: "/src/assets/ipoteka.jpeg",
      description: "Ипотечная программа от 6.9% годовых",
      price: 0,
      category: "Кредиты",
      link: "/loans"
    },
    {
      id: 8,
      name: "Консервативный портфель",
      image: "/src/assets/invest.jpeg",
      description: "Низкий риск, доходность 8-12%",
      price: 0,
      category: "Инвестиции",
      link: "/invest"
    },
    {
      id: 9,
      name: "Умеренный портфель",
      image: "/src/assets/invest.jpeg",
      description: "Средний риск, доходность 12-18%",
      price: 0,
      category: "Инвестиции",
      link: "/invest"
    },
    {
      id: 10,
      name: "Агрессивный портфель",
      image: "/src/assets/invest.jpeg",
      description: "Высокий риск, доходность 18-30%",
      price: 0,
      category: "Инвестиции",
      link: "/invest"
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
    alert(`✅ ${product.name} добавлен в корзину!`);
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
            <Link to="/cards" className="menu__link">Карты</Link>
            <Link to="/loans" className="menu__link">Кредиты</Link>
            <Link to="/invest" className="menu__link">Инвестиции</Link>
            <Link to="/about" className="menu__link">О нас</Link>
            <Link to="/contact" className="menu__link">Контакты</Link>
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
          <p className="section__lead">Выберите подходящий продукт для ваших финансовых целей</p>

          <div className="filters-bar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-chip ${filter === cat ? 'active' : ''}`}
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
                  <div className="card-category">{product.category}</div>
                  <h3 className="card__title">{product.name}</h3>
                  <p className="card__text">{product.description}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    <Link
                      to={product.link}
                      className="btn btn--primary"
                      style={{ flex: 1 }}
                    >
                      Подробнее
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn--ghost"
                      style={{ flex: 1 }}
                    >
                      В корзину
                    </button>
                  </div>
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

      <style>{`
        .filters-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-chip {
          padding: 0.75rem 1.5rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .filter-chip:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #fff;
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .card-category {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 12px;
          color: #6366f1;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </>
  );
}