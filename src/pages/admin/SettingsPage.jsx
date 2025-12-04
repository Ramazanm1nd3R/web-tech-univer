import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("admin_settings");
    return saved
      ? JSON.parse(saved)
      : {
          siteName: "TuranBank",
          siteDescription: "Современный банковский сервис",
          currency: "KZT",
          timezone: "Asia/Almaty",
          emailNotifications: true,
          smsNotifications: false,
          autoBackup: true,
          maintenanceMode: false,
          registrationEnabled: true,
          theme: "dark",
          language: "ru",
        };
  });

  const [activity, setActivity] = useLocalStorageArray("admin_activity", []);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    setActivity((prev) => [
      {
        type: "SETTINGS_UPDATED",
        message: "Настройки системы обновлены",
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Сбросить все настройки к значениям по умолчанию?")) {
      const defaultSettings = {
        siteName: "TuranBank",
        siteDescription: "Современный банковский сервис",
        currency: "KZT",
        timezone: "Asia/Almaty",
        emailNotifications: true,
        smsNotifications: false,
        autoBackup: true,
        maintenanceMode: false,
        registrationEnabled: true,
        theme: "dark",
        language: "ru",
      };
      setSettings(defaultSettings);
      localStorage.setItem("admin_settings", JSON.stringify(defaultSettings));
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>⚙️ Настройки системы</h2>
        <p className="muted">Управление конфигурацией и параметрами</p>
      </div>

      {saved && (
        <div className="alert alert-success">
          ✓ Настройки успешно сохранены!
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-section">
          <h3>🏢 Основные настройки</h3>
          <div className="settings-group">
            <div className="form-field">
              <label>Название сайта</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                placeholder="TuranBank"
              />
            </div>

            <div className="form-field">
              <label>Описание</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleChange("siteDescription", e.target.value)
                }
                rows={3}
                placeholder="Описание сайта"
              />
            </div>

            <div className="form-field">
              <label>Валюта</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                <option value="KZT">🇰🇿 Тенге (KZT)</option>
                <option value="USD">🇺🇸 Доллар (USD)</option>
                <option value="EUR">🇪🇺 Евро (EUR)</option>
                <option value="RUB">🇷🇺 Рубль (RUB)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Часовой пояс</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
              >
                <option value="Asia/Almaty">Asia/Almaty (GMT+6)</option>
                <option value="Europe/Moscow">Europe/Moscow (GMT+3)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Язык интерфейса</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇬🇧 English</option>
                <option value="kk">🇰🇿 Қазақша</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔔 Уведомления</h3>
          <div className="settings-group">
            <div className="toggle-field">
              <div className="toggle-info">
                <div className="toggle-label">Email уведомления</div>
                <div className="toggle-description">
                  Получать уведомления на почту
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    handleChange("emailNotifications", e.target.checked)
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-field">
              <div className="toggle-info">
                <div className="toggle-label">SMS уведомления</div>
                <div className="toggle-description">
                  Получать SMS о важных событиях
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    handleChange("smsNotifications", e.target.checked)
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔧 Система</h3>
          <div className="settings-group">
            <div className="toggle-field">
              <div className="toggle-info">
                <div className="toggle-label">Автоматическое резервное копирование</div>
                <div className="toggle-description">
                  Создавать бэкапы каждую ночь
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) =>
                    handleChange("autoBackup", e.target.checked)
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-field">
              <div className="toggle-info">
                <div className="toggle-label">Режим обслуживания</div>
                <div className="toggle-description">
                  Закрыть сайт для пользователей
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleChange("maintenanceMode", e.target.checked)
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-field">
              <div className="toggle-info">
                <div className="toggle-label">Регистрация открыта</div>
                <div className="toggle-description">
                  Разрешить новым пользователям регистрацию
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.registrationEnabled}
                  onChange={(e) =>
                    handleChange("registrationEnabled", e.target.checked)
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🎨 Внешний вид</h3>
          <div className="settings-group">
            <div className="form-field">
              <label>Тема оформления</label>
              <div className="theme-selector">
                <button
                  className={
                    settings.theme === "dark"
                      ? "theme-btn active"
                      : "theme-btn"
                  }
                  onClick={() => handleChange("theme", "dark")}
                >
                  <span className="theme-preview dark-preview">🌙</span>
                  Темная
                </button>
                <button
                  className={
                    settings.theme === "light"
                      ? "theme-btn active"
                      : "theme-btn"
                  }
                  onClick={() => handleChange("theme", "light")}
                >
                  <span className="theme-preview light-preview">☀️</span>
                  Светлая
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h3>⚠️ Опасная зона</h3>
          <div className="settings-group">
            <div className="danger-action">
              <div>
                <div className="danger-label">Очистить кэш</div>
                <div className="danger-description">
                  Удалить временные файлы и данные
                </div>
              </div>
              <button className="btn btn--ghost">Очистить</button>
            </div>

            <div className="danger-action">
              <div>
                <div className="danger-label">Сброс настроек</div>
                <div className="danger-description">
                  Вернуть все настройки к значениям по умолчанию
                </div>
              </div>
              <button className="btn btn--danger" onClick={handleReset}>
                Сбросить
              </button>
            </div>

            <div className="danger-action">
              <div>
                <div className="danger-label">Экспорт данных</div>
                <div className="danger-description">
                  Скачать все данные системы в JSON
                </div>
              </div>
              <button className="btn btn--ghost">Экспортировать</button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn--primary btn--lg" onClick={handleSave}>
          💾 Сохранить изменения
        </button>
        <button className="btn btn--ghost btn--lg" onClick={handleReset}>
          ↺ Сбросить
        </button>
      </div>

      <style>{`
        .settings-page {
          max-width: 1200px;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .alert {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #10b981;
        }

        .settings-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .settings-section {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .settings-section h3 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-group {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .form-field input,
        .form-field textarea,
        .form-field select {
          padding: 0.875rem 1rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-field input:focus,
        .form-field textarea:focus,
        .form-field select:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .toggle-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          gap: 1rem;
        }

        .toggle-info {
          flex: 1;
        }

        .toggle-label {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .toggle-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .toggle {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 28px;
          flex-shrink: 0;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.2);
          transition: 0.3s;
          border-radius: 28px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle input:checked + .toggle-slider {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .toggle input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        .theme-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .theme-btn {
          padding: 1rem;
          background: rgba(10, 14, 39, 0.6);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .theme-btn:hover {
          border-color: #6366f1;
        }

        .theme-btn.active {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.2);
        }

        .theme-preview {
          font-size: 2rem;
        }

        .danger-zone {
          border-color: rgba(239, 68, 68, 0.3);
        }

        .danger-zone h3 {
          color: #ef4444;
        }

        .danger-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          gap: 1rem;
        }

        .danger-label {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .danger-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .btn--danger {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .btn--danger:hover {
          background: #ef4444;
          color: #fff;
        }

        .settings-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-start;
        }

        .btn--lg {
          padding: 1rem 2rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}