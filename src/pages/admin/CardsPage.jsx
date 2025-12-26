import React from "react";
import { Link } from "react-router-dom";

export default function CardsPage() {
  const cards = [
    {
      name: "Premium Card",
      level: "Premium",
      cashback: "10%",
      limit: "₸ 2 000 000",
      fee: "₸ 15 000/год",
      features: [
        "Кешбэк 10% на все покупки",
        "Приоритетная поддержка 24/7",
        "Доступ в VIP-залы аэропортов",
        "Бесплатное снятие в любых банкоматах",
        "Страхование путешествий",
      ],
      gradient: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
    },
    {
      name: "Gold Card",
      level: "Gold",
      cashback: "5%",
      limit: "₸ 1 000 000",
      fee: "₸ 8 000/год",
      features: [
        "Кешбэк 5% на категории",
        "Поддержка 24/7",
        "Бесплатное обслуживание в первый год",
        "SMS-уведомления бесплатно",
        "Скидки у партнеров до 20%",
      ],
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    },
    {
      name: "Classic Card",
      level: "Classic",
      cashback: "1%",
      limit: "₸ 500 000",
      fee: "Бесплатно",
      features: [
        "Кешбэк 1% на все покупки",
        "Мобильный банк бесплатно",
        "Бесконтактные платежи",
        "Apple Pay / Google Pay",
        "Быстрое оформление онлайн",
      ],
      gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    },
  ];

  return (
    <>
      <div className="snow-container" id="snow"></div>

      <header className="nav glass">
        <div className="container nav__inner">
          <Link className="brand" to="/">
            Roma<span>Credit</span>Bank
          </Link>

          <nav className="menu">
            <Link to="/" className="menu__link">
              Главная
            </Link>
            <Link to="/products" className="menu__link">
              Продукты
            </Link>
            <Link to="/cards" className="menu__link active">
              Карты
            </Link>
          </nav>

          <Link to="/register" className="btn btn--primary">
            Регистрация
          </Link>
        </div>
      </header>

      <section className="cards-hero">
        <div className="container">
          <h1 className="cards-hero__title">
            Банковские карты
            <span className="accent">Выбери свой уровень</span>
          </h1>
          <p className="cards-hero__text">
            Премиальные карты с максимальным кешбэком и привилегиями
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-comparison">
            {cards.map((card, idx) => (
              <div key={idx} className="card-option glass">
                <div className="card-visual" style={{ background: card.gradient }}>
                  <div className="card-visual-level">{card.level}</div>
                  <div className="card-visual-name">{card.name}</div>
                  <div className="card-visual-chip">💳</div>
                </div>

                <div className="card-details">
                  <div className="card-highlight">
                    <span className="highlight-label">Кешбэк</span>
                    <span className="highlight-value">{card.cashback}</span>
                  </div>

                  <div className="card-info-grid">
                    <div className="info-item">
                      <span className="info-label">Лимит</span>
                      <span className="info-value">{card.limit}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Обслуживание</span>
                      <span className="info-value">{card.fee}</span>
                    </div>
                  </div>

                  <div className="card-features">
                    <h4>Преимущества:</h4>
                    <ul>
                      {card.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn--primary btn--fullwidth">
                    Оформить карту
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

      <style>{`
        .cards-hero {
          padding: 150px 0 80px;
          text-align: center;
        }

        .cards-hero__title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cards-hero__text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .cards-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .card-option {
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .card-option:hover {
          transform: translateY(-8px);
        }

        .card-visual {
          padding: 2rem;
          color: #fff;
          position: relative;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-visual-level {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .card-visual-name {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .card-visual-chip {
          font-size: 2.5rem;
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
        }

        .card-details {
          padding: 2rem;
        }

        .card-highlight {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .highlight-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .highlight-value {
          font-size: 2rem;
          font-weight: 700;
          color: #6366f1;
        }

        .card-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .info-value {
          color: #fff;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .card-features {
          margin-bottom: 1.5rem;
        }

        .card-features h4 {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .card-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-features li {
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 0;
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}