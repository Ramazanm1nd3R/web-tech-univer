import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const stats = [
    { value: "15+", label: "Лет на рынке", icon: "📅" },
    { value: "500K+", label: "Довольных клиентов", icon: "👥" },
    { value: "50+", label: "Отделений по стране", icon: "🏢" },
    { value: "₸100B+", label: "Активов под управлением", icon: "💰" },
  ];

  const team = [
    {
      name: "Роман Абдуллаев",
      position: "CEO & Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roman",
      description: "Визионер с 20-летним опытом в финтехе",
    },
    {
      name: "Айгуль Нурланова",
      position: "CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aigul",
      description: "Эксперт в области цифровых технологий",
    },
    {
      name: "Данияр Каримов",
      position: "CFO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniyar",
      description: "Финансовый стратег международного уровня",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Инновации",
      description: "Внедряем передовые технологии для вашего удобства",
    },
    {
      icon: "🤝",
      title: "Доверие",
      description: "Прозрачность и честность во всех операциях",
    },
    {
      icon: "⚡",
      title: "Скорость",
      description: "Мгновенные переводы и быстрое обслуживание",
    },
    {
      icon: "🔒",
      title: "Безопасность",
      description: "Защита данных на уровне мировых стандартов",
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
            <Link to="/about" className="menu__link active">
              О нас
            </Link>
            <Link to="/contact" className="menu__link">
              Контакты
            </Link>
          </nav>

          <Link to="/register" className="btn btn--primary">
            Регистрация
          </Link>
        </div>
      </header>

      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">
            О RomaCreditBank
            <span className="accent">История успеха</span>
          </h1>
          <p className="about-hero__text">
            Мы — современный финансовый институт, который меняет представление о
            банковских услугах. С 2010 года мы помогаем людям и бизнесу
            достигать финансовых целей.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-box glass">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Наши ценности</h2>
          <div className="values-grid">
            {values.map((value, idx) => (
              <div key={idx} className="value-card glass">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Наша команда</h2>
          <div className="team-grid">
            {team.map((member, idx) => (
              <div key={idx} className="team-card glass">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-avatar"
                />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
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
        .about-hero {
          padding: 150px 0 80px;
          text-align: center;
        }

        .about-hero__title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .about-hero__text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-box {
          padding: 2rem;
          text-align: center;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .stat-box:hover {
          transform: translateY(-8px);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .value-card {
          padding: 2rem;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .value-card:hover {
          transform: translateY(-4px);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }

        .value-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .team-card {
          padding: 2rem;
          text-align: center;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .team-card:hover {
          transform: translateY(-4px);
        }

        .team-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .team-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .team-position {
          color: #6366f1;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .team-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}