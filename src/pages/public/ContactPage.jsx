import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contacts = [
    {
      icon: "📞",
      title: "Телефон",
      value: "+7 (727) 123-45-67",
      description: "Круглосуточная поддержка",
    },
    {
      icon: "📧",
      title: "Email",
      value: "info@romacreditbank.kz",
      description: "Ответим в течение 24 часов",
    },
    {
      icon: "📍",
      title: "Адрес",
      value: "г. Алматы, пр. Абая 150",
      description: "Главный офис",
    },
    {
      icon: "⏰",
      title: "Режим работы",
      value: "Пн-Пт: 9:00 - 18:00",
      description: "Сб-Вс: Выходной",
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
            <Link to="/about" className="menu__link">
              О нас
            </Link>
            <Link to="/contact" className="menu__link active">
              Контакты
            </Link>
          </nav>

          <Link to="/register" className="btn btn--primary">
            Регистрация
          </Link>
        </div>
      </header>

      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero__title">
            Свяжитесь с нами
            <span className="accent">Мы всегда на связи</span>
          </h1>
          <p className="contact-hero__text">
            Есть вопросы? Наша команда готова помочь вам 24/7
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contacts-grid">
            {contacts.map((contact, idx) => (
              <div key={idx} className="contact-box glass">
                <div className="contact-icon">{contact.icon}</div>
                <h3 className="contact-title">{contact.title}</h3>
                <div className="contact-value">{contact.value}</div>
                <div className="contact-description">{contact.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-content glass">
              <h2 className="form-title">Отправьте нам сообщение</h2>
              <p className="form-subtitle">
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="form-group">
                    <label>Тема</label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    >
                      <option value="">Выберите тему</option>
                      <option value="cards">Вопрос по картам</option>
                      <option value="loans">Вопрос по кредитам</option>
                      <option value="deposits">Вопрос по депозитам</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Сообщение</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    placeholder="Опишите ваш вопрос подробнее..."
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--fullwidth">
                  Отправить сообщение
                </button>
              </form>
            </div>

            <div className="contact-map glass">
              <h3>Наше расположение</h3>
              <div className="map-placeholder">
                🗺️ Карта офиса
                <p>г. Алматы, пр. Абая 150</p>
              </div>
            </div>
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
        .contact-hero {
          padding: 150px 0 80px;
          text-align: center;
        }

        .contact-hero__title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-hero__text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
        }

        .contacts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .contact-box {
          padding: 2rem;
          text-align: center;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .contact-box:hover {
          transform: translateY(-4px);
        }

        .contact-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .contact-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .contact-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 0.5rem;
        }

        .contact-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .contact-form-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .contact-form-wrapper {
            grid-template-columns: 1fr;
          }
        }

        .contact-form-content {
          padding: 2.5rem;
          border-radius: 16px;
        }

        .form-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.875rem 1rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .contact-map {
          padding: 2.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
        }

        .contact-map h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
        }

        .map-placeholder {
          flex: 1;
          background: rgba(10, 14, 39, 0.6);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.3);
          padding: 2rem;
          text-align: center;
        }

        .map-placeholder p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}