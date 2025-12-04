import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password || !formData.confirm) {
      alert("⚠ Пожалуйста, заполните все поля.");
      return;
    }

    if (formData.password !== formData.confirm) {
      alert("⚠ Пароли не совпадают.");
      return;
    }

    alert(`🎉 Аккаунт для ${formData.fullname} успешно зарегистрирован!`);
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="snow-container" id="snow"></div>

      <header className="nav glass">
        <div className="container nav__inner">
          <Link className="brand" to="/">Roma<span>Credit</span>Bank</Link>
        </div>
      </header>

      <section className="register-section">
        <div className="register-box glass">
          <h2 className="register-title">Создать аккаунт</h2>
          <p className="register-subtitle">Присоединяйтесь к RomaCreditBank</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="fullname">Полное имя</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Иван Иванов"
              value={formData.fullname}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ivan@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="confirm">Подтвердите пароль</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="••••••••"
              value={formData.confirm}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn--primary btn--fullwidth">
              Зарегистрироваться
            </button>
          </form>

          <p className="register-footer">
            Уже есть аккаунт? <Link to="/">Войти</Link>
          </p>
        </div>
      </section>

      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>
    </>
  );
}
