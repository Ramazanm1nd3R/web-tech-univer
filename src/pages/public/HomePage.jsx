import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function HomePage() {
  const [products, setProducts] = useLocalStorageArray("products", [
    {
      id: 1,
      name: "Карты",
      image: "/src/assets/cardsjpeg.jpeg",
      description: "Дебетовые и кредитные карты с кешбэком до 10%",
      price: 0,
      category: "Карты",
      link: "/cards"
    },
    {
      id: 2,
      name: "Депозиты",
      image: "/src/assets/deposit.jpg",
      description: "Надежные вклады с доходностью до 14.5% годовых",
      price: 0,
      category: "Депозиты",
      link: "/products"
    },
    {
      id: 3,
      name: "Кредиты",
      image: "/src/assets/ipoteka.jpeg",
      description: "Кредитные программы от 6.9% годовых",
      price: 0,
      category: "Кредиты",
      link: "/loans"
    },
    {
      id: 4,
      name: "Инвестиции",
      image: "/src/assets/invest.jpeg",
      description: "Инвестиционные портфели для роста капитала",
      price: 0,
      category: "Инвестиции",
      link: "/invest"
    }
  ]);

  const [cart, setCart] = useLocalStorageArray("cart", []);
  const [depositAmount, setDepositAmount] = useState(1000000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(14.5);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCart, setShowCart] = useState(false);

  // Countdown timer для Black Friday + New Year
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

  // Снег эффект
  useEffect(() => {
    const snowContainer = document.getElementById("snow");
    if (!snowContainer) return;

    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      flake.textContent = "❄";
      flake.style.left = Math.random() * 100 + "%";
      flake.style.animationDuration = 3 + Math.random() * 5 + "s";
      flake.style.animationDelay = Math.random() * 3 + "s";
      flake.style.fontSize = 10 + Math.random() * 10 + "px";
      snowContainer.appendChild(flake);
    }
  }, []);

  // Калькулятор депозита
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
          <Link className="brand" to="/">Roma<span>Credit</span>Bank</Link>

          <nav className="menu">
            <Link to="/" className="menu__link active">Главная</Link>
            <Link to="/products" className="menu__link">Продукты</Link>
            <Link to="/cards" className="menu__link">Карты</Link>
            <Link to="/loans" className="menu__link">Кредиты</Link>
            <Link to="/invest" className="menu__link">Инвестиции</Link>
            <Link to="/about" className="menu__link">О нас</Link>
            <Link to="/contact" className="menu__link">Контакты</Link>
          </nav>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/register" className="btn btn--primary register-btn">Регистрация</Link>
            <button onClick={() => setShowCart(true)} className="btn btn--ghost">
              🛒 Корзина ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero reveal active">
        <div className="container hero__grid glass">
          <div className="hero__left">
            <h1 className="hero__title">
              Онлайн-банк нового поколения <br />
              <span className="accent">для людей и бизнеса</span>
            </h1>
            <p className="hero__text">Умные продукты, прозрачные ставки, мгновенные переводы — всё в одном приложении.</p>

            <div className="hero__cta">
              <Link to="/products" className="btn btn--primary">Наши продукты</Link>
              <Link to="/about" className="btn btn--ghost">Узнать больше</Link>
            </div>

            <ul className="hero__badges">
              <li>🔒 Защита уровня банка</li>
              <li>⚡ Переводы 24/7</li>
              <li>💳 Кешбэк до 10%</li>
            </ul>
          </div>

          <div className="hero__right">
            <div className="hero__card hero__card--gradient">
              <div className="hero__amount">₸ 1 000 000</div>
              <div className="hero__caption">Предодобренный лимит</div>
            </div>

            <div className="hero__card">
              <div className="hero__chart"></div>
              <div className="hero__caption">Рост инвестпортфеля</div>
            </div>
          </div>
        </div>
      </section>

      {/* BLACK FRIDAY + NEW YEAR COUNTDOWN */}
      <section className="bf-ny-wrapper reveal active">
        <div className="bf-ny-box glass">
          <h2 className="bf-title">🎄 New Year Sale 2025 🎉</h2>
          <p className="bf-sub">До Нового Года осталось:</p>

          <div className="countdown">
            <div><span>{String(countdown.days).padStart(2, '0')}</span><label>Дней</label></div>
            <div><span>{String(countdown.hours).padStart(2, '0')}</span><label>Часов</label></div>
            <div><span>{String(countdown.minutes).padStart(2, '0')}</span><label>Мин</label></div>
            <div><span>{String(countdown.seconds).padStart(2, '0')}</span><label>Сек</label></div>
          </div>

          <div className="ny-decor">
            <div className="snowflake">❄</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section reveal active">
        <div className="container">
          <h2 className="section__title">Популярные продукты</h2>
          <div className="grid grid--cards">
            {products.map(product => (
              <div key={product.id} className="card glass">
                <img src={product.image} alt={product.name} className="card__img" />
                <div className="card__body">
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

      {/* DEPOSIT CALCULATOR */}
      <section className="section reveal active">
        <div className="container">
          <h2 className="section__title">Калькулятор депозита</h2>
          <p className="section__lead">Рассчитайте доход по вкладу в RomaCreditBank за несколько секунд.</p>

          <div className="deposit-calc glass">
            <div className="calc-left">
              <label>Сумма депозита (₸)</label>
              <input
                type="range"
                min="1000"
                max="25000000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
              />
              <p>{depositAmount.toLocaleString()} ₸</p>

              <label>Срок (в месяцах)</label>
              <input
                type="range"
                min="6"
                max="36"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
              <p>{months} мес.</p>

              <label>Годовая ставка (%)</label>
              <input
                type="number"
                value={rate}
                step="0.1"
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            <div className="calc-right glass">
              <h3>Наше предложение</h3>
              <p>Ставка депозита: <strong>{rate}%</strong></p>
              <p>Сумма в конце срока: <strong>{Math.round(finalSum).toLocaleString()} ₸</strong></p>
              <p>Доход: <strong style={{ color: "#10b981" }}>+{Math.round(profit).toLocaleString()} ₸</strong></p>
              <Link to="/products" className="btn btn--primary">Открыть депозит</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer-content">
            <div className="footer-section">
              <h4>RomaCreditBank</h4>
              <p>Онлайн-банк нового поколения</p>
            </div>
            <div className="footer-section">
              <h4>Продукты</h4>
              <Link to="/cards">Карты</Link>
              <Link to="/loans">Кредиты</Link>
              <Link to="/invest">Инвестиции</Link>
            </div>
            <div className="footer-section">
              <h4>Компания</h4>
              <Link to="/about">О нас</Link>
              <Link to="/contact">Контакты</Link>
            </div>
            <div className="footer-section">
              <h4>Мы в соцсетях</h4>
              <div className="social-links">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">Telegram</a>
              </div>
            </div>
          </div>
          <p className="copy">© 2025 RomaCreditBank. Все права защищены.</p>
        </div>
      </footer>

      {/* BLOBS */}
      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>

      {/* CART MODAL */}
      {showCart && (
        <div className="cart-popup">
          <div className="cart-popup__window glass">
            <button onClick={() => setShowCart(false)} className="cart-popup__close">✕</button>

            <h2 className="cart-popup__title">Ваш заказ</h2>

            <div className="cart-popup__items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>🛒 Корзина пуста</p>
                  <Link to="/products" onClick={() => setShowCart(false)} className="btn btn--primary">
                    Перейти к продуктам
                  </Link>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price > 0 ? `${item.price} ₸` : 'Бесплатно'}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="btn-remove">🗑️</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-popup__footer">
                <div className="cart-popup__total">
                  Итого: <span>{total.toLocaleString()} ₸</span>
                </div>
                <button className="btn btn--primary cart-popup__checkout">
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h4 {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .footer-section a {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }

        .footer-section a:hover {
          color: #6366f1;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .empty-cart {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-cart p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
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

        .cart-item img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info h4 {
          color: #fff;
          margin: 0 0 0.25rem 0;
        }

        .cart-item-info p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.95rem;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cart-item-controls button {
          width: 32px;
          height: 32px;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 6px;
          color: #6366f1;
          cursor: pointer;
          font-weight: 700;
        }

        .cart-item-controls span {
          min-width: 30px;
          text-align: center;
          color: #fff;
          font-weight: 600;
        }

        .btn-remove {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          border-radius: 6px;
          color: #ef4444;
          cursor: pointer;
          padding: 0.5rem;
          font-size: 1.125rem;
        }

        .btn-remove:hover {
          background: rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </>
  );
}