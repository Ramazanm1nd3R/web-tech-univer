import React from 'react';
import { useApp } from '../../context/AppContext';

export default function SettingsTile() {
  const { theme, toggleTheme, language, setLanguage } = useApp();

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ];

  return (
    <div className="tile glass">
      <div className="tile-header">
        <h3 className="tile-title">⚙️ Настройки</h3>
      </div>

      <div className="settings-section">
        <h4 className="settings-subtitle">Тема</h4>
        <div className="theme-buttons">
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            🌙 Темная
          </button>
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            ☀️ Светлая
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h4 className="settings-subtitle">Язык</h4>
        <div className="language-buttons">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h4 className="settings-subtitle">Уведомления</h4>
        <div className="toggle-list">
          <label className="toggle-item">
            <span>Email</span>
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
          <label className="toggle-item">
            <span>Push</span>
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
          <label className="toggle-item">
            <span>SMS</span>
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <style>{`
        .settings-section {
          margin-bottom: 1.5rem;
        }

        .settings-section:last-child {
          margin-bottom: 0;
        }

        .settings-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin: 0 0 0.75rem 0;
        }

        .theme-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .theme-btn {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .theme-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .theme-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #fff;
        }

        .language-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lang-btn {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-size: 0.9rem;
        }

        .lang-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .lang-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
        }

        .toggle-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          cursor: pointer;
          color: #fff;
          font-size: 0.9rem;
        }

        .toggle-item input[type="checkbox"] {
          display: none;
        }

        .toggle-slider {
          width: 42px;
          height: 22px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 11px;
          position: relative;
          transition: all 0.3s;
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: all 0.3s;
        }

        .toggle-item input:checked ~ .toggle-slider {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .toggle-item input:checked ~ .toggle-slider::before {
          transform: translateX(20px);
        }
      `}</style>
    </div>
  );
}