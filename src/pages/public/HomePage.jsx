import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";
import { useApp } from "../../context/AppContext";
import DashboardWidget from "../../components/DashboardWidget";
import CurrencyTile from "../../components/tiles/CurrencyTile";
import AchievementsTile from "../../components/tiles/AchievementsTile";
import QuestsTile from "../../components/tiles/QuestsTile";
import SettingsTile from "../../components/tiles/SettingsTile";

export default function HomePage() {
  const { user, addPoints } = useApp();
  
  const [products, setProducts] = useLocalStorageArray("products", [
    {
      id: 1,
      name: "Карты",
      emoji: "💳",
      icon: "💎",
      description: "Дебетовые и кредитные карты с кешбэком до 10%",
      price: 0,
      category: "Карты",
      link: "/cards",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea"
    },
    {
      id: 2,
      name: "Депозиты",
      emoji: "💰",
      icon: "💵",
      description: "Надежные вклады с доходностью до 14.5% годовых",
      price: 0,
      category: "Депозиты",
      link: "/products",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb"
    },
    {
      id: 3,
      name: "Кредиты",
      emoji: "🏦",
      icon: "🏛️",
      description: "Кредитные программы от 6.9% годовых",
      price: 0,
      category: "Кредиты",
      link: "/loans",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe"
    },
    {
      id: 4,
      name: "Инвестиции",
      emoji: "📈",
      icon: "📊",
      description: "Инвестиционные портфели для роста капитала",
      price: 0,
      category: "Инвестиции",
      link: "/invest",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      color: "#43e97b"
    }
  ]);

  const [cart, setCart] = useLocalStorageArray("cart", []);
  const [depositAmount, setDepositAmount] = useState(1000000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(14.5);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-12-31T23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const snowContainer = document.getElementById("snow");
    if (!snowContainer) return;
    snowContainer.innerHTML = '';
    
    for (let i = 0; i < 40; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      flake.textContent = "❄";
      flake.style.left = Math.random() * 100 + "%";
      flake.style.animationDuration = 3 + Math.random() * 5 + "s";
      flake.style.animationDelay = Math.random() * 3 + "s";
      flake.style.fontSize = 10 + Math.random() * 8 + "px";
      flake.style.opacity = 0.4 + Math.random() * 0.4;
      snowContainer.appendChild(flake);
    }
  }, []);

  const calculateDeposit = () => {
    const P = depositAmount;
    const r = rate / 100;
    const n = months / 12;
    const A = P * (1 + r * n);
    const profit = A - P;
    return { finalSum: A, profit };
  };

  const { finalSum, profit } = calculateDeposit();

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    addPoints(5);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="snow-container" id="snow"></div>

      {/* NAV */}
      <header className="nav glass">
        <div className="container nav__inner">
          <Link className="brand" to="/">
            Roma<span>Credit</span>Bank
          </Link>

          <nav className="menu">
            <Link to="/" className="menu__link active">Главная</Link>
            <Link to="/products" className="menu__link">Продукты</Link>
            <Link to="/cards" className="menu__link">Карты</Link>
            <Link to="/loans" className="menu__link">Кредиты</Link>
            <Link to="/invest" className="menu__link">Инвестиции</Link>
            <Link to="/about" className="menu__link">О нас</Link>
            <Link to="/contact" className="menu__link">Контакты</Link>
          </nav>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {user ? (
              <div className="user-badge">
                👤 {user.name}
              </div>
            ) : (
              <Link to="/register" className="btn btn--primary">Регистрация</Link>
            )}
            <button onClick={() => setShowCart(true)} className="btn btn--ghost">
              🛒 ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🎄 Новогодние предложения 2025</div>
            <h1 className="hero-title">
              Онлайн-банк нового поколения
              <span className="hero-accent">для людей и бизнеса</span>
            </h1>
            <p className="hero-text">
              Умные продукты, прозрачные ставки, мгновенные переводы
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn--primary btn--large">
                Наши продукты
              </Link>
              <Link to="/about" className="btn btn--ghost btn--large">
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="section-compact">
        <div className="container">
          <div className="countdown-banner glass">
            <div className="countdown-info">
              <span className="countdown-emoji">🎄</span>
              <div>
                <h3>New Year Sale</h3>
                <p>До Нового Года осталось</p>
              </div>
            </div>
            <div className="countdown-timer">
              <div className="timer-item">
                <span>{String(countdown.days).padStart(2, '0')}</span>
                <label>дн</label>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-item">
                <span>{String(countdown.hours).padStart(2, '0')}</span>
                <label>ч</label>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-item">
                <span>{String(countdown.minutes).padStart(2, '0')}</span>
                <label>м</label>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-item">
                <span>{String(countdown.seconds).padStart(2, '0')}</span>
                <label>с</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      {user && (
        <section className="section-compact">
          <div className="container">
            <DashboardWidget />
          </div>
        </section>
      )}

      {/* PRODUCTS & TILES */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Популярные продукты и сервисы</h2>
          
          <div className="tiles-grid">
            {/* Продукты с НОВОЙ визуализацией */}
            {products.map(product => (
              <div key={product.id} className="product-tile glass">
                {/* Вместо картинки - красивая иконка с градиентом */}
                <div className="product-header" style={{ background: product.gradient }}>
                  <div className="product-icon-wrapper">
                    <span className="product-icon-main">{product.emoji}</span>
                    <span className="product-icon-bg">{product.icon}</span>
                  </div>
                  <div className="product-badge">Новинка</div>
                </div>
                
                <div className="product-body">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  
                  <div className="product-features">
                    <div className="feature-item">
                      <span className="feature-icon">⚡</span>
                      <span>Быстро</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🔒</span>
                      <span>Надежно</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">💎</span>
                      <span>Выгодно</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <Link to={product.link} className="btn btn--primary btn--small">
                      Подробнее
                    </Link>
                    <button onClick={() => addToCart(product)} className="btn btn--ghost btn--small">
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Виджеты */}
            <CurrencyTile />
            <AchievementsTile />
            <QuestsTile />
            <SettingsTile />

            {/* Калькулятор - ИСПРАВЛЕННЫЙ */}
            <div className="calculator-tile glass">
              <h3 className="tile-title">🧮 Калькулятор депозита</h3>
              
              <div className="calc-layout">
                <div className="calc-controls">
                  <div className="calc-field">
                    <label>Сумма депозита</label>
                    <div className="calc-value">{depositAmount.toLocaleString()} ₸</div>
                    <input
                      type="range"
                      min="100000"
                      max="25000000"
                      step="100000"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="calc-range"
                    />
                  </div>

                  <div className="calc-field">
                    <label>Срок вклада</label>
                    <div className="calc-value">{months} мес.</div>
                    <input
                      type="range"
                      min="6"
                      max="36"
                      step="1"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="calc-range"
                    />
                  </div>

                  <div className="calc-field">
                    <label>Годовая ставка</label>
                    <div className="calc-value">{rate}%</div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.5"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="calc-range"
                    />
                  </div>
                </div>

                <div className="calc-result">
                  <div className="calc-result-box">
                    <span className="result-label">Вы получите</span>
                    <span className="result-amount">{Math.round(finalSum).toLocaleString()} ₸</span>
                  </div>
                  <div className="calc-details">
                    <div className="detail-row">
                      <span>Ваш вклад:</span>
                      <span>{depositAmount.toLocaleString()} ₸</span>
                    </div>
                    <div className="detail-row detail-profit">
                      <span>Доход:</span>
                      <span>+{Math.round(profit).toLocaleString()} ₸</span>
                    </div>
                  </div>
                  <Link to="/products" className="btn btn--primary btn--full">
                    Открыть депозит
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>RomaCreditBank</h4>
              <p>Онлайн-банк нового поколения</p>
            </div>
            <div className="footer-col">
              <h4>Продукты</h4>
              <Link to="/cards">Карты</Link>
              <Link to="/loans">Кредиты</Link>
              <Link to="/invest">Инвестиции</Link>
            </div>
            <div className="footer-col">
              <h4>Компания</h4>
              <Link to="/about">О нас</Link>
              <Link to="/contact">Контакты</Link>
            </div>
            <div className="footer-col">
              <h4>Соцсети</h4>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Telegram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 RomaCreditBank. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>

      {/* CART MODAL */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Корзина</h2>
              <button onClick={() => setShowCart(false)} className="modal-close">✕</button>
            </div>

            <div className="modal-body">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <span className="cart-empty-icon">🛒</span>
                  <p>Корзина пуста</p>
                  <Link to="/products" onClick={() => setShowCart(false)} className="btn btn--primary">
                    К продуктам
                  </Link>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-visual" style={{ background: item.gradient }}>
                      {item.emoji}
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price > 0 ? `${item.price} ₸` : 'Бесплатно'}</p>
                    </div>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="cart-item-remove">
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="modal-footer">
                <div className="cart-total">
                  <span>Итого:</span>
                  <span>{total.toLocaleString()} ₸</span>
                </div>
                <button className="btn btn--primary btn--full">Оформить заказ</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        /* HERO */
        .hero {
          padding: 120px 0 3rem;
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, #e63946 0%, #2a9d8f 100%);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 2.75rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .hero-accent {
          display: block;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 0.5rem;
        }

        .hero-text {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 2rem 0;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn--large {
          padding: 0.875rem 2rem;
          font-size: 1.05rem;
        }

        /* COUNTDOWN */
        .section {
          padding: 3rem 0;
        }

        .section-compact {
          padding: 2rem 0;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 2rem 0;
        }

        .countdown-banner {
          padding: 1.5rem 2rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .countdown-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .countdown-emoji {
          font-size: 2.5rem;
        }

        .countdown-info h3 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
        }

        .countdown-info p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.875rem;
        }

        .countdown-timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .timer-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;
        }

        .timer-item span {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .timer-item label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
        }

        .timer-sep {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 700;
        }

        /* TILES GRID */
        .tiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* PRODUCT TILES - НОВЫЙ ДИЗАЙН */
        .product-tile {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .product-tile:hover {
          transform: translateY(-4px);
        }

        .product-header {
          height: 160px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-icon-main {
          font-size: 5rem;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
          position: relative;
          z-index: 2;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .product-icon-bg {
          position: absolute;
          font-size: 8rem;
          opacity: 0.15;
          z-index: 1;
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: #1a1f3a;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .product-body {
          padding: 1.5rem;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }

        .product-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        .product-features {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .feature-icon {
          font-size: 0.9rem;
        }

        .product-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .btn--small {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .btn--full {
          width: 100%;
        }

        /* CALCULATOR - ИСПРАВЛЕННЫЙ */
        .calculator-tile {
          grid-column: span 2;
          padding: 2rem;
          border-radius: 12px;
        }

        .tile-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 2rem 0;
        }

        .calc-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }

        .calc-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .calc-field label {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .calc-value {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .calc-range {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          -webkit-appearance: none;
        }

        .calc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
        }

        .calc-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
        }

        .calc-result {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .calc-result-box {
          padding: 1.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .result-label {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .result-amount {
          display: block;
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
        }

        .calc-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .detail-profit {
          color: #10b981;
          font-weight: 600;
        }

        /* USER BADGE */
        .user-badge {
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 20px;
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* FOOTER */
        .footer {
          padding: 3rem 0 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-col h4 {
          color: #fff;
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
        }

        .footer-col p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.9rem;
        }

        .footer-col a {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: #6366f1;
        }

        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          font-size: 0.875rem;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-content {
          max-width: 600px;
          width: 100%;
          border-radius: 16px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h2 {
          color: #fff;
          margin: 0;
          font-size: 1.5rem;
        }

        .modal-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.5rem;
          cursor: pointer;
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .modal-close:hover {
          color: #fff;
        }

        .modal-body {
          padding: 1.5rem 2rem;
          overflow-y: auto;
          flex: 1;
        }

        .cart-empty {
          text-align: center;
          padding: 3rem 1rem;
        }

        .cart-empty-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 1rem;
        }

        .cart-empty p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .cart-item-visual {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          flex-shrink: 0;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info h4 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }

        .cart-item-info p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.875rem;
        }

        .cart-item-qty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cart-item-qty button {
          width: 28px;
          height: 28px;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 6px;
          color: #6366f1;
          cursor: pointer;
          font-weight: 700;
        }

        .cart-item-qty span {
          min-width: 25px;
          text-align: center;
          color: #fff;
          font-weight: 600;
        }

        .cart-item-remove {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 1.25rem;
          padding: 0.25rem;
        }

        .modal-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .tiles-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }

          .calculator-tile {
            grid-column: span 1;
          }

          .calc-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .tiles-grid {
            grid-template-columns: 1fr;
          }

          .countdown-banner {
            flex-direction: column;
            text-align: center;
          }

          .hero-title {
            font-size: 2rem;
          }

          .user-badge {
            display: none;
          }

          .menu {
            display: none;
          }
        }
      `}</style>
    </>
  );
}