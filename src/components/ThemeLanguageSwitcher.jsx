import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ThemeLanguageSwitcher() {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  const languages = {
    ru: { name: 'Русский', flag: '🇷🇺' },
    en: { name: 'English', flag: '🇬🇧' },
    kz: { name: 'Қазақша', flag: '🇰🇿' },
  };

  return (
    <>
      <div className="settings-widget">
        <button 
          className="settings-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⚙️
        </button>

        {showMenu && (
          <div className="settings-menu">
            <div className="settings-section">
              <h4>🎨 Тема</h4>
              <div className="theme-switcher">
                <button
                  className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                  onClick={toggleTheme}
                >
                  <span className="theme-icon">🌙</span>
                  <span>Темная</span>
                </button>
                <button
                  className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={toggleTheme}
                >
                  <span className="theme-icon">☀️</span>
                  <span>Светлая</span>
                </button>
              </div>
            </div>

            <div className="settings-section">
              <h4>🌐 Язык</h4>
              <div className="language-list">
                {Object.entries(languages).map(([code, data]) => (
                  <button
                    key={code}
                    className={`lang-btn ${language === code ? 'active' : ''}`}
                    onClick={() => setLanguage(code)}
                  >
                    <span className="lang-flag">{data.flag}</span>
                    <span>{data.name}</span>
                    {language === code && <span className="checkmark">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <h4>🔔 Уведомления</h4>
              <div className="toggle-group">
                <label className="toggle-item">
                  <span>Email уведомления</span>
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <label className="toggle-item">
                  <span>Push уведомления</span>
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <label className="toggle-item">
                  <span>SMS уведомления</span>
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .settings-widget {
          position: fixed;
          bottom: 110px;
          right: 30px;
          z-index: 1000;
        }

        .settings-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .settings-menu {
          position: absolute;
          bottom: 60px;
          right: 0;
          width: 320px;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
          padding: 1.5rem;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .settings-section {
          margin-bottom: 1.5rem;
        }

        .settings-section:last-child {
          margin-bottom: 0;
        }

        .settings-section h4 {
          color: #fff;
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .theme-switcher {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .theme-btn {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .theme-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .theme-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #fff;
        }

        .theme-icon {
          font-size: 1.5rem;
        }

        .language-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lang-btn {
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        .lang-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .lang-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
        }

        .lang-flag {
          font-size: 1.5rem;
        }

        .checkmark {
          margin-left: auto;
          color: #10b981;
          font-weight: 700;
        }

        .toggle-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          position: relative;
        }

        .toggle-item input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          width: 48px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          position: relative;
          transition: all 0.3s;
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
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
          transform: translateX(24px);
        }

        @media (max-width: 768px) {
          .settings-widget {
            bottom: 100px;
            right: 20px;
          }

          .settings-menu {
            width: calc(100vw - 40px);
            right: -20px;
          }
        }
      `}</style>
    </>
  );
}