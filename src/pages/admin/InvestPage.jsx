import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function InvestPage() {
  const [investAmount, setInvestAmount] = useState(1000000);
  const [investTerm, setInvestTerm] = useState(12);
  const [riskLevel, setRiskLevel] = useState("moderate");

  const getExpectedReturn = () => {
    const returns = {
      conservative: 8,
      moderate: 15,
      aggressive: 25,
    };
    const annualReturn = returns[riskLevel] / 100;
    const years = investTerm / 12;
    const finalAmount = investAmount * Math.pow(1 + annualReturn, years);
    const profit = finalAmount - investAmount;
    
    return {
      finalAmount: Math.round(finalAmount),
      profit: Math.round(profit),
      returnRate: returns[riskLevel],
    };
  };

  const { finalAmount, profit, returnRate } = getExpectedReturn();

  const portfolios = [
    {
      name: "Консервативный",
      level: "conservative",
      risk: "Низкий",
      return: "8-12%",
      icon: "🛡️",
      description: "Минимальный риск, стабильный доход",
      composition: [
        { type: "Облигации", percent: 70 },
        { type: "Акции", percent: 20 },
        { type: "Золото", percent: 10 },
      ],
      color: "#10b981",
    },
    {
      name: "Умеренный",
      level: "moderate",
      risk: "Средний",
      return: "12-18%",
      icon: "⚖️",
      description: "Баланс между риском и доходностью",
      composition: [
        { type: "Акции", percent: 50 },
        { type: "Облигации", percent: 35 },
        { type: "Золото", percent: 15 },
      ],
      color: "#6366f1",
    },
    {
      name: "Агрессивный",
      level: "aggressive",
      risk: "Высокий",
      return: "18-30%",
      icon: "🚀",
      description: "Высокая доходность, повышенный риск",
      composition: [
        { type: "Акции", percent: 70 },
        { type: "Криптовалюта", percent: 20 },
        { type: "Облигации", percent: 10 },
      ],
      color: "#f59e0b",
    },
  ];

  const features = [
    {
      icon: "📊",
      title: "Диверсификация",
      description: "Распределение рисков по разным активам",
    },
    {
      icon: "💎",
      title: "Профессиональное управление",
      description: "Опытные управляющие следят за вашим портфелем",
    },
    {
      icon: "📱",
      title: "Мобильный доступ",
      description: "Следите за инвестициями в реальном времени",
    },
    {
      icon: "🔄",
      title: "Автоматическая ребалансировка",
      description: "Портфель автоматически подстраивается под рынок",
    },
  ];

  const instruments = [
    { name: "Акции", icon: "📈", description: "Ценные бумаги крупнейших компаний" },
    { name: "Облигации", icon: "📜", description: "Надежные долговые инструменты" },
    { name: "Золото", icon: "🥇", description: "Защита от инфляции" },
    { name: "ETF", icon: "📊", description: "Биржевые фонды с низкой комиссией" },
    { name: "Недвижимость", icon: "🏢", description: "REIT фонды" },
    { name: "Криптовалюта", icon: "₿", description: "Цифровые активы" },
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
            <Link to="/invest" className="menu__link active">
              Инвестиции
            </Link>
          </nav>

          <Link to="/register" className="btn btn--primary">
            Регистрация
          </Link>
        </div>
      </header>

      <section className="invest-hero">
        <div className="container">
          <h1 className="invest-hero__title">
            Инвестиции
            <span className="accent">Приумножайте капитал</span>
          </h1>
          <p className="invest-hero__text">
            Профессиональное управление активами с доходностью до 30% годовых
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Инвестиционные портфели</h2>
          <div className="portfolios-grid">
            {portfolios.map((portfolio, idx) => (
              <div 
                key={idx} 
                className="portfolio-card glass"
                onClick={() => setRiskLevel(portfolio.level)}
              >
                <div className="portfolio-header">
                  <div 
                    className="portfolio-icon"
                    style={{ background: portfolio.color }}
                  >
                    {portfolio.icon}
                  </div>
                  <div>
                    <h3 className="portfolio-name">{portfolio.name}</h3>
                    <div className="portfolio-risk">Риск: {portfolio.risk}</div>
                  </div>
                </div>

                <div className="portfolio-return">
                  <div className="return-label">Ожидаемая доходность</div>
                  <div 
                    className="return-value"
                    style={{ color: portfolio.color }}
                  >
                    {portfolio.return}
                  </div>
                </div>

                <p className="portfolio-description">{portfolio.description}</p>

                <div className="portfolio-composition">
                  <h4>Состав портфеля:</h4>
                  <div className="composition-bars">
                    {portfolio.composition.map((item, i) => (
                      <div key={i} className="composition-item">
                        <div className="composition-label">
                          {item.type} - {item.percent}%
                        </div>
                        <div className="composition-bar">
                          <div 
                            className="composition-fill"
                            style={{ 
                              width: `${item.percent}%`,
                              background: portfolio.color 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className={`btn btn--fullwidth ${
                    riskLevel === portfolio.level ? 'btn--primary' : 'btn--ghost'
                  }`}
                >
                  {riskLevel === portfolio.level ? '✓ Выбрано' : 'Выбрать'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Калькулятор инвестиций</h2>
          <div className="invest-calculator glass">
            <div className="calculator-left">
              <div className="calc-input-group">
                <label>Сумма инвестиций</label>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                />
                <div className="input-display">
                  {investAmount.toLocaleString("ru-RU")} ₸
                </div>
              </div>

              <div className="calc-input-group">
                <label>Срок инвестирования</label>
                <input
                  type="range"
                  min="6"
                  max="120"
                  step="6"
                  value={investTerm}
                  onChange={(e) => setInvestTerm(Number(e.target.value))}
                />
                <div className="input-display">
                  {investTerm} мес. ({Math.floor(investTerm / 12)} лет)
                </div>
              </div>

              <div className="calc-input-group">
                <label>Уровень риска</label>
                <div className="risk-selector">
                  {portfolios.map((p, idx) => (
                    <button
                      key={idx}
                      className={`risk-btn ${riskLevel === p.level ? 'active' : ''}`}
                      onClick={() => setRiskLevel(p.level)}
                      style={riskLevel === p.level ? { borderColor: p.color, background: `${p.color}20` } : {}}
                    >
                      {p.icon} {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="calculator-right">
              <h3>Прогноз доходности</h3>
              <div className="forecast-results">
                <div className="forecast-item main">
                  <div className="forecast-label">Итоговая сумма</div>
                  <div className="forecast-value">
                    {finalAmount.toLocaleString("ru-RU")} ₸
                  </div>
                </div>

                <div className="forecast-item">
                  <div className="forecast-label">Доход</div>
                  <div className="forecast-value profit">
                    +{profit.toLocaleString("ru-RU")} ₸
                  </div>
                </div>

                <div className="forecast-item">
                  <div className="forecast-label">Доходность</div>
                  <div className="forecast-value">
                    {returnRate}% годовых
                  </div>
                </div>
              </div>

              <div className="forecast-chart">
                <div className="chart-bar initial">
                  <div className="bar-label">Вложено</div>
                  <div className="bar-value">
                    {investAmount.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
                <div className="chart-arrow">→</div>
                <div className="chart-bar final">
                  <div className="bar-label">Получите</div>
                  <div className="bar-value">
                    {finalAmount.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
              </div>

              <button className="btn btn--primary btn--fullwidth">
                Начать инвестировать
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Инвестиционные инструменты</h2>
          <div className="instruments-grid">
            {instruments.map((instrument, idx) => (
              <div key={idx} className="instrument-card glass">
                <div className="instrument-icon">{instrument.icon}</div>
                <h3 className="instrument-name">{instrument.name}</h3>
                <p className="instrument-description">{instrument.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Почему инвестировать с нами</h2>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card glass">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
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
        .invest-hero {
          padding: 150px 0 80px;
          text-align: center;
        }

        .invest-hero__title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .invest-hero__text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .portfolios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .portfolio-card {
          padding: 2rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .portfolio-card:hover {
          transform: translateY(-4px);
        }

        .portfolio-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .portfolio-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .portfolio-name {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .portfolio-risk {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .portfolio-return {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .return-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .return-value {
          font-size: 2rem;
          font-weight: 700;
        }

        .portfolio-description {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .portfolio-composition {
          margin-bottom: 1.5rem;
        }

        .portfolio-composition h4 {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .composition-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .composition-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .composition-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .composition-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .composition-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .invest-calculator {
          padding: 2.5rem;
          border-radius: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .invest-calculator {
            grid-template-columns: 1fr;
          }
        }

        .calculator-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .calc-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .calc-input-group label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 1rem;
        }

        .calc-input-group input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          -webkit-appearance: none;
        }

        .calc-input-group input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }

        .input-display {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .risk-selector {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .risk-btn {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
        }

        .risk-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .risk-btn.active {
          font-weight: 700;
        }

        .calculator-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .calculator-right h3 {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .forecast-results {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .forecast-item {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border-left: 4px solid #6366f1;
        }

        .forecast-item.main {
          background: rgba(99, 102, 241, 0.1);
        }

        .forecast-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .forecast-value {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .forecast-value.profit {
          color: #10b981;
        }

        .forecast-chart {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }

        .chart-bar {
          flex: 1;
          padding: 1.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 2px solid #6366f1;
          border-radius: 12px;
          text-align: center;
        }

        .chart-bar.final {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
        }

        .bar-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .bar-value {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 700;
        }

        .chart-arrow {
          color: #6366f1;
          font-size: 2rem;
          font-weight: 700;
        }

        .instruments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .instrument-card {
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s;
        }

        .instrument-card:hover {
          transform: translateY(-4px);
        }

        .instrument-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .instrument-name {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .instrument-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .feature-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}