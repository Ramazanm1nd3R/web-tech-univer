import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function SecurityPage() {
  const [sessions, setSessions] = useLocalStorageArray("admin_sessions", [
    {
      id: 1,
      device: "Chrome на Windows",
      location: "Almaty, Kazakhstan",
      ip: "85.159.123.45",
      lastActive: new Date(Date.now() - 300000),
      current: true,
    },
    {
      id: 2,
      device: "Safari на MacOS",
      location: "Astana, Kazakhstan",
      ip: "195.210.45.67",
      lastActive: new Date(Date.now() - 86400000),
      current: false,
    },
    {
      id: 3,
      device: "Firefox на Linux",
      location: "Moscow, Russia",
      ip: "93.158.134.12",
      lastActive: new Date(Date.now() - 172800000),
      current: false,
    },
  ]);

  const [loginAttempts] = useState([
    {
      id: 1,
      success: true,
      ip: "85.159.123.45",
      location: "Almaty, KZ",
      device: "Chrome/Windows",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      success: false,
      ip: "142.250.185.78",
      location: "Unknown",
      device: "Unknown",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 3,
      success: true,
      ip: "195.210.45.67",
      location: "Astana, KZ",
      device: "Safari/MacOS",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 4,
      success: false,
      ip: "142.250.185.78",
      location: "Unknown",
      device: "Unknown",
      timestamp: new Date(Date.now() - 90000000),
    },
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    unusualActivityAlerts: true,
    sessionTimeout: 30,
    ipWhitelist: false,
    requirePasswordChange: false,
  });

  const terminateSession = (id) => {
    if (window.confirm("Завершить эту сессию?")) {
      setSessions(sessions.filter(s => s.id !== id));
    }
  };

  const terminateAllSessions = () => {
    if (window.confirm("Завершить все сессии кроме текущей?")) {
      setSessions(sessions.filter(s => s.current));
    }
  };

  const securityScore = () => {
    let score = 0;
    if (securitySettings.twoFactorAuth) score += 30;
    if (securitySettings.loginNotifications) score += 20;
    if (securitySettings.unusualActivityAlerts) score += 20;
    if (securitySettings.sessionTimeout <= 30) score += 15;
    if (securitySettings.ipWhitelist) score += 15;
    return score;
  };

  const score = securityScore();
  const scoreColor = score >= 80 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  const threatLog = [
    {
      id: 1,
      type: "brute_force",
      severity: "high",
      message: "Обнаружена попытка подбора пароля",
      ip: "142.250.185.78",
      timestamp: new Date(Date.now() - 7200000),
      blocked: true,
    },
    {
      id: 2,
      type: "suspicious_location",
      severity: "medium",
      message: "Вход с нового местоположения",
      ip: "93.158.134.12",
      timestamp: new Date(Date.now() - 172800000),
      blocked: false,
    },
    {
      id: 3,
      type: "sql_injection",
      severity: "critical",
      message: "Попытка SQL инъекции заблокирована",
      ip: "198.51.100.42",
      timestamp: new Date(Date.now() - 259200000),
      blocked: true,
    },
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      critical: "#ef4444",
      high: "#f59e0b",
      medium: "#fbbf24",
      low: "#6b7280",
    };
    return colors[severity] || "#6b7280";
  };

  return (
    <div className="security-page">
      <div className="security-score-card">
        <div className="score-header">
          <h3>🛡️ Уровень безопасности</h3>
          <div className="score-circle" style={{ borderColor: scoreColor }}>
            <div className="score-value" style={{ color: scoreColor }}>
              {score}
            </div>
            <div className="score-label">из 100</div>
          </div>
        </div>
        <div className="score-bar">
          <div 
            className="score-fill"
            style={{ 
              width: `${score}%`,
              background: scoreColor 
            }}
          />
        </div>
        <p className="score-description">
          {score >= 80 ? "Отличная защита! Ваш аккаунт хорошо защищен." : 
           score >= 50 ? "Хорошая защита. Рекомендуем включить дополнительные меры." :
           "Низкий уровень защиты! Необходимо усилить безопасность."}
        </p>
      </div>

      <div className="security-grid">
        <div className="security-section">
          <h3>⚙️ Настройки безопасности</h3>
          <div className="settings-list">
            <div className="security-setting">
              <div className="setting-info">
                <div className="setting-name">Двухфакторная аутентификация</div>
                <div className="setting-description">
                  Дополнительный код при входе
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="security-setting">
              <div className="setting-info">
                <div className="setting-name">Уведомления о входе</div>
                <div className="setting-description">
                  Получать уведомления о новых входах
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={securitySettings.loginNotifications}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, loginNotifications: e.target.checked })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="security-setting">
              <div className="setting-info">
                <div className="setting-name">Оповещения о подозрительной активности</div>
                <div className="setting-description">
                  Предупреждения о необычных действиях
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={securitySettings.unusualActivityAlerts}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, unusualActivityAlerts: e.target.checked })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="security-setting">
              <div className="setting-info">
                <div className="setting-name">Белый список IP адресов</div>
                <div className="setting-description">
                  Разрешить вход только с определенных IP
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={securitySettings.ipWhitelist}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.checked })
                  }
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="security-setting">
              <div className="setting-info">
                <div className="setting-name">Тайм-аут сессии</div>
                <div className="setting-description">
                  Автоматический выход через {securitySettings.sessionTimeout} минут
                </div>
              </div>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) =>
                  setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })
                }
                className="timeout-select"
              >
                <option value={15}>15 минут</option>
                <option value={30}>30 минут</option>
                <option value={60}>1 час</option>
                <option value={120}>2 часа</option>
              </select>
            </div>
          </div>

          <button className="btn btn--primary btn--fullwidth">
            💾 Сохранить настройки
          </button>
        </div>

        <div className="security-section">
          <div className="section-header">
            <h3>💻 Активные сессии</h3>
            <button className="btn btn--danger btn--sm" onClick={terminateAllSessions}>
              Завершить все
            </button>
          </div>

          <div className="sessions-list">
            {sessions.map((session) => (
              <div key={session.id} className="session-card">
                <div className="session-status">
                  {session.current ? "🟢" : "⚪"}
                </div>
                <div className="session-info">
                  <div className="session-device">{session.device}</div>
                  <div className="session-details">
                    {session.location} • {session.ip}
                  </div>
                  <div className="session-time">
                    {session.current
                      ? "Текущая сессия"
                      : `${Math.floor((Date.now() - session.lastActive) / 3600000)} ч. назад`}
                  </div>
                </div>
                {!session.current && (
                  <button 
                    className="btn btn--ghost btn--sm"
                    onClick={() => terminateSession(session.id)}
                  >
                    Завершить
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="security-grid">
        <div className="security-section">
          <h3>🔐 История входов</h3>
          <div className="login-attempts-list">
            {loginAttempts.map((attempt) => (
              <div 
                key={attempt.id} 
                className={`login-attempt ${attempt.success ? 'success' : 'failed'}`}
              >
                <div className="attempt-icon">
                  {attempt.success ? "✓" : "✕"}
                </div>
                <div className="attempt-info">
                  <div className="attempt-status">
                    {attempt.success ? "Успешный вход" : "Неудачная попытка"}
                  </div>
                  <div className="attempt-details">
                    {attempt.ip} • {attempt.location} • {attempt.device}
                  </div>
                  <div className="attempt-time">
                    {new Date(attempt.timestamp).toLocaleString("ru-RU")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="security-section">
          <h3>⚠️ Журнал угроз</h3>
          <div className="threats-list">
            {threatLog.map((threat) => (
              <div key={threat.id} className="threat-card">
                <div 
                  className="threat-severity"
                  style={{ background: getSeverityColor(threat.severity) }}
                >
                  {threat.severity}
                </div>
                <div className="threat-info">
                  <div className="threat-message">{threat.message}</div>
                  <div className="threat-details">
                    IP: {threat.ip} • {threat.blocked ? "🔒 Заблокировано" : "⚠️ Предупреждение"}
                  </div>
                  <div className="threat-time">
                    {new Date(threat.timestamp).toLocaleString("ru-RU")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="password-section">
        <h3>🔑 Смена пароля</h3>
        <div className="password-form">
          <div className="form-group">
            <label>Текущий пароль</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Новый пароль</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="btn btn--primary">
            🔐 Изменить пароль
          </button>
        </div>
      </div>

      <style>{`
        .security-page {
          max-width: 1600px;
        }

        .security-score-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .score-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .score-header h3 {
          color: #fff;
          font-size: 1.5rem;
          margin: 0;
        }

        .score-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-value {
          font-size: 2rem;
          font-weight: 700;
        }

        .score-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .score-bar {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .score-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 1s ease;
        }

        .score-description {
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          margin: 0;
        }

        .security-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .security-section {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .security-section h3 {
          color: #fff;
          font-size: 1.25rem;
          margin: 0 0 1.5rem 0;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .security-setting {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .setting-info {
          flex: 1;
        }

        .setting-name {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .setting-description {
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

        .timeout-select {
          padding: 0.5rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 0.95rem;
        }

        .btn--primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
        }

        .btn--danger {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .btn--ghost {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn--sm {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .btn--fullwidth {
          width: 100%;
        }

        .sessions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .session-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .session-status {
          font-size: 1.5rem;
        }

        .session-info {
          flex: 1;
        }

        .session-device {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .session-details {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .session-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .login-attempts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-attempt {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border-left: 4px solid;
        }

        .login-attempt.success {
          border-left-color: #10b981;
        }

        .login-attempt.failed {
          border-left-color: #ef4444;
        }

        .attempt-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .login-attempt.success .attempt-icon {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .login-attempt.failed .attempt-icon {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .attempt-info {
          flex: 1;
        }

        .attempt-status {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .attempt-details {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .attempt-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .threats-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .threat-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .threat-severity {
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          height: fit-content;
        }

        .threat-info {
          flex: 1;
        }

        .threat-message {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .threat-details {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .threat-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .password-section {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .password-section h3 {
          color: #fff;
          font-size: 1.25rem;
          margin: 0 0 1.5rem 0;
        }

        .password-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
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
        }

        .form-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
}