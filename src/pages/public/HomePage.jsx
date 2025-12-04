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
      category: "Карты"
    },
    {
      id: 2,
      name: "Депозиты",
      image: "/src/assets/deposit.jpg",
      description: "Надежные вклады с доходностью до 14.5% годовых",
      price: 0,
      category: "Депозиты"
    },
    {
      id: 3,
      name: "Ипотека",
      image: "/src/assets/ipoteka.jpeg",
      description: "Ипотечные программы от 6.9% годовых",
      price: 0,
      category: "Ипотека"
    },
    {
      id: 4,
      name: "Инвестиции",
      image: "/src/assets/invest.jpeg",
      description: "Инвестиционные портфели для роста капитала",
      price: 0,
      category: "Инвестиции"
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
            <a href="#" className="menu__link">Ипотека</a>
            <a href="#" className="menu__link">Карты</a>
            <a href="#" className="menu__link">Кредиты</a>
            <a href="#" className="menu__link">Депозиты</a>
            <a href="#" className="menu__link">Инвестиции</a>
            <a href="#" className="menu__link">Платежи</a>
            <a href="#" className="menu__link">Тарифы</a>
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
              <button onClick={() => setShowCart(true)} className="btn btn--primary">Корзина</button>
              <a href="#" className="btn btn--ghost">Узнать тарифы</a>
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
          <h2 className="bf-title">Black Friday + New Year Sale</h2>
          <p className="bf-sub">До супер-скидок осталось:</p>

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
              <p>Доход: {Math.round(profit).toLocaleString()} ₸</p>
              <button className="btn btn--primary">Подробнее</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <p>Мы в соцсетях:</p>
          <p className="footer__links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Telegram</a>
          </p>
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
                <p>Корзина пуста</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.price} ₸</p>
                    </div>
                    <div>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-popup__footer">
              <div className="cart-popup__total">
                Итого: <span>{total.toLocaleString()} ₸</span>
              </div>
              <button className="btn btn--primary cart-popup__checkout">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
