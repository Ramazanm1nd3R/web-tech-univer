import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agree: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password || !formData.confirm) {
      alert("⚠ Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (formData.password !== formData.confirm) {
      alert("⚠ Пароли не совпадают.");
      return;
    }

    if (formData.password.length < 8) {
      alert("⚠ Пароль должен содержать минимум 8 символов.");
      return;
    }

    if (!formData.agree) {
      alert("⚠ Необходимо согласиться с условиями использования.");
      return;
    }

    alert(`🎉 Добро пожаловать, ${formData.fullname}! Ваш аккаунт успешно создан.`);
    navigate("/");
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <>
      <div className="snow-container" id="snow"></div>

      <header className="nav glass">
        <div className="container nav__inner">
          <Link className="brand" to="/">Roma<span>Credit</span>Bank</Link>

          <nav className="menu">
            <Link to="/" className="menu__link">Главная</Link>
            <Link to="/products" className="menu__link">Продукты</Link>
          </nav>
        </div>
      </header>

      <section className="register-section">
        <div className="register-box glass">
          <div className="register-header">
            <h2 className="register-title">Создать аккаунт</h2>
            <p className="register-subtitle">Присоединяйтесь к RomaCreditBank</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullname">Полное имя *</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Иван Иванов"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ivan@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль *</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Минимум 8 символов"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <div className="password-hint">
                Используйте буквы, цифры и специальные символы
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Подтвердите пароль *</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Повторите пароль"
                value={formData.confirm}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree">
                Я согласен с <a href="#">условиями использования</a> и <a href="#">политикой конфиденциальности</a>
              </label>
            </div>

            <button type="submit" className="btn btn--primary btn--fullwidth">
              Зарегистрироваться
            </button>
          </form>

          <div className="register-footer">
            <p>
              Уже есть аккаунт? <Link to="/">Войти</Link>
            </p>
            <div className="social-register">
              <p>Или зарегистрируйтесь через:</p>
              <div className="social-buttons">
                <button className="btn-social">Google</button>
                <button className="btn-social">Facebook</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>

      <style>{`
        .register-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 1rem 4rem;
        }

        .register-box {
          max-width: 500px;
          width: 100%;
          padding: 3rem;
          border-radius: 16px;
        }

        .register-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .register-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .register-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
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

        .form-group input {
          padding: 0.875rem 1rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .password-hint {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .form-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .form-checkbox input[type="checkbox"] {
          margin-top: 0.25rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .form-checkbox label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .form-checkbox a {
          color: #6366f1;
          text-decoration: none;
        }

        .form-checkbox a:hover {
          text-decoration: underline;
        }

        .register-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .register-footer > p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }

        .register-footer a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
        }

        .register-footer a:hover {
          text-decoration: underline;
        }

        .social-register {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-register p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .social-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .btn-social {
          flex: 1;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .btn-social:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}