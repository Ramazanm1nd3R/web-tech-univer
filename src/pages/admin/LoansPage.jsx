import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoansPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [rate] = useState(12.9);

  const calculateLoan = () => {
    const P = loanAmount;
    const r = rate / 100 / 12;
    const n = loanTerm;
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const overpayment = totalPayment - P;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      overpayment: Math.round(overpayment),
    };
  };

  const { monthlyPayment, totalPayment, overpayment } = calculateLoan();

  const loans = [
    {
      name: "Потребительский кредит",
      icon: "🛍️",
      rate: "от 12.9%",
      maxAmount: "₸ 10 000 000",
      maxTerm: "5 лет",
      features: [
        "Без залога и поручителей",
        "Решение за 15 минут",
        "Онлайн оформление",
        "Гибкий график погашения",
      ],
      color: "#6366f1",
    },
    {
      name: "Автокредит",
      icon: "🚗",
      rate: "от 8.9%",
      maxAmount: "₸ 50 000 000",
      maxTerm: "7 лет",
      features: [
        "На новые и б/у авто",
        "Первый взнос от 10%",
        "Страхование в подарок",
        "Досрочное погашение без комиссии",
      ],
      color: "#10b981",
    },
    {
      name: "Ипотека",
      icon: "🏠",
      rate: "от 6.9%",
      maxAmount: "₸ 100 000 000",
      maxTerm: "25 лет",
      features: [
        "На готовое и строящееся жилье",
        "Первый взнос от 15%",
        "Господдержка доступна",
        "Рефинансирование других банков",
      ],
      color: "#f59e0b",
    },
    {
      name: "Бизнес-кредит",
      icon: "💼",
      rate: "от 14.9%",
      maxAmount: "₸ 200 000 000",
      maxTerm: "10 лет",
      features: [
        "Для ИП и ТОО",
        "На развитие бизнеса",
        "Льготные программы",
        "Индивидуальные условия",
      ],
      color: "#8b5cf6",
    },
  ];

  const advantages = [
    {
      icon: "⚡",
      title: "Быстрое решение",
      description: "Одобрение за 15 минут онлайн",
    },
    {
      icon: "📱",
      title: "Онлайн оформление",
      description: "Подайте заявку не выходя из дома",
    },
    {
      icon: "💰",
      title: "Без скрытых комиссий",
      description: "Прозрачные условия кредитования",
    },
    {
      icon: "🎯",
      title: "Гибкие условия",
      description: "Индивидуальный подход к каждому",
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
            <Link to="/loans" className="menu__link active">
              Кредиты
            </Link>
          </nav>

          <Link to="/register" className="btn btn--primary">
            Регистрация
          </Link>
        </div>
      </header>

      <section className="loans-hero">
        <div className="container">
          <h1 className="loans-hero__title">
            Кредиты для жизни
            <span className="accent">От 6.9% годовых</span>
          </h1>
          <p className="loans-hero__text">
            Выгодные условия, быстрое одобрение, прозрачные выплаты
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Наши кредитные продукты</h2>
          <div className="loans-grid">
            {loans.map((loan, idx) => (
              <div key={idx} className="loan-card glass">
                <div className="loan-header">
                  <div 
                    className="loan-icon"
                    style={{ background: loan.color }}
                  >
                    {loan.icon}
                  </div>
                  <h3 className="loan-name">{loan.name}</h3>
                </div>

                <div className="loan-highlights">
                  <div className="highlight-item">
                    <div className="highlight-label">Ставка</div>
                    <div className="highlight-value" style={{ color: loan.color }}>
                      {loan.rate}
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-label">До</div>
                    <div className="highlight-value">{loan.maxAmount}</div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-label">Срок</div>
                    <div className="highlight-value">{loan.maxTerm}</div>
                  </div>
                </div>

                <div className="loan-features">
                  <h4>Преимущества:</h4>
                  <ul>
                    {loan.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn--primary btn--fullwidth">
                  Подать заявку
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Рассчитайте ваш кредит</h2>
          <div className="loan-calculator glass">
            <div className="calculator-inputs">
              <div className="calculator-input-group">
                <label>Сумма кредита</label>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
                <div className="input-value">
                  {loanAmount.toLocaleString("ru-RU")} ₸
                </div>
              </div>

              <div className="calculator-input-group">
                <label>Срок кредита (месяцев)</label>
                <input
                  type="range"
                  min="6"
                  max="84"
                  step="6"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
                <div className="input-value">
                  {loanTerm} мес. ({Math.floor(loanTerm / 12)} лет {loanTerm % 12} мес.)
                </div>
              </div>

              <div className="calculator-input-group">
                <label>Процентная ставка</label>
                <div className="input-value rate-value">{rate}% годовых</div>
              </div>
            </div>

            <div className="calculator-results">
              <h3>Результаты расчета</h3>
              <div className="results-grid">
                <div className="result-item">
                  <div className="result-label">Ежемесячный платеж</div>
                  <div className="result-value primary">
                    {monthlyPayment.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-label">Общая сумма выплат</div>
                  <div className="result-value">
                    {totalPayment.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
                <div className="result-item">
                  <div className="result-label">Переплата</div>
                  <div className="result-value warning">
                    {overpayment.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
              </div>

              <button className="btn btn--primary btn--fullwidth">
                Оформить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Почему выбирают нас</h2>
          <div className="advantages-grid">
            {advantages.map((adv, idx) => (
              <div key={idx} className="advantage-card glass">
                <div className="advantage-icon">{adv.icon}</div>
                <h3 className="advantage-title">{adv.title}</h3>
                <p className="advantage-description">{adv.description}</p>
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
        .loans-hero {
          padding: 150px 0 80px;
          text-align: center;
        }

        .loans-hero__title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .loans-hero__text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .loans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .loan-card {
          padding: 2rem;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .loan-card:hover {
          transform: translateY(-4px);
        }

        .loan-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .loan-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .loan-name {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .loan-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .highlight-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .highlight-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .highlight-value {
          color: #fff;
          font-weight: 700;
          font-size: 1.125rem;
        }

        .loan-features {
          margin-bottom: 1.5rem;
        }

        .loan-features h4 {
          color: #fff;
          margin-bottom: 1rem;
        }

        .loan-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .loan-features li {
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 0;
          font-size: 0.95rem;
        }

        .loan-calculator {
          padding: 2.5rem;
          border-radius: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .loan-calculator {
            grid-template-columns: 1fr;
          }
        }

        .calculator-inputs {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .calculator-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .calculator-input-group label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 1rem;
        }

        .calculator-input-group input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          -webkit-appearance: none;
        }

        .calculator-input-group input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }

        .input-value {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .rate-value {
          color: #6366f1;
        }

        .calculator-results {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .calculator-results h3 {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .results-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .result-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border-left: 4px solid #6366f1;
        }

        .result-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .result-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .result-value.primary {
          color: #6366f1;
        }

        .result-value.warning {
          color: #f59e0b;
        }

        .advantages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .advantage-card {
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s;
        }

        .advantage-card:hover {
          transform: translateY(-4px);
        }

        .advantage-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .advantage-title {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .advantage-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}