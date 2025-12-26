import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useLocalStorageArray("admin_notifications", [
    {
      id: 1,
      type: "transaction",
      title: "Новая транзакция",
      message: "Пополнение счета на сумму 150,000 ₸",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false,
      priority: "normal",
    },
    {
      id: 2,
      type: "security",
      title: "Попытка входа",
      message: "Обнаружена попытка входа с нового устройства (Chrome, Windows)",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      priority: "high",
    },
    {
      id: 3,
      type: "system",
      title: "Обновление системы",
      message: "Система будет обновлена 31 декабря в 02:00",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "order",
      title: "Новый заказ",
      message: "Клиент Иван Иванов оформил заказ на Premium Card",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: false,
      priority: "normal",
    },
    {
      id: 5,
      type: "user",
      title: "Новая регистрация",
      message: "Зарегистрирован новый пользователь: maria@example.com",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      read: true,
      priority: "low",
    },
    {
      id: 6,
      type: "security",
      title: "Подозрительная активность",
      message: "Обнаружено 5 неудачных попыток входа за последний час",
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      read: false,
      priority: "critical",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true,
    systemAlerts: false,
    orderAlerts: true,
    userAlerts: false,
  });

  const getNotificationIcon = (type) => {
    const icons = {
      transaction: "💳",
      security: "🔒",
      system: "⚙️",
      order: "📦",
      user: "👤",
    };
    return icons[type] || "🔔";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: "#ef4444",
      high: "#f59e0b",
      normal: "#6366f1",
      low: "#6b7280",
    };
    return colors[priority] || "#6366f1";
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Удалить все уведомления?")) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    critical: notifications.filter(n => n.priority === "critical").length,
  };

  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Только что";
    if (minutes < 60) return `${minutes} мин. назад`;
    if (hours < 24) return `${hours} ч. назад`;
    return `${days} дн. назад`;
  };

  return (
    <div className="notifications-page">
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-icon" style={{ background: "#6366f1" }}>
            🔔
          </div>
          <div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Всего уведомлений</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon" style={{ background: "#f59e0b" }}>
            ⭐
          </div>
          <div>
            <div className="stat-value">{stats.unread}</div>
            <div className="stat-label">Непрочитанных</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon" style={{ background: "#ef4444" }}>
            ⚠️
          </div>
          <div>
            <div className="stat-value">{stats.critical}</div>
            <div className="stat-label">Критичных</div>
          </div>
        </div>
      </div>

      <div className="notifications-layout">
        <div className="notifications-main">
          <div className="notifications-header">
            <div className="filter-tabs">
              <button
                className={filter === "all" ? "tab active" : "tab"}
                onClick={() => setFilter("all")}
              >
                Все
              </button>
              <button
                className={filter === "unread" ? "tab active" : "tab"}
                onClick={() => setFilter("unread")}
              >
                Непрочитанные ({stats.unread})
              </button>
              <button
                className={filter === "transaction" ? "tab active" : "tab"}
                onClick={() => setFilter("transaction")}
              >
                💳 Транзакции
              </button>
              <button
                className={filter === "security" ? "tab active" : "tab"}
                onClick={() => setFilter("security")}
              >
                🔒 Безопасность
              </button>
              <button
                className={filter === "order" ? "tab active" : "tab"}
                onClick={() => setFilter("order")}
              >
                📦 Заказы
              </button>
            </div>

            <div className="header-actions">
              <button className="btn btn--ghost btn--sm" onClick={markAllAsRead}>
                ✓ Прочитать все
              </button>
              <button className="btn btn--ghost btn--sm" onClick={clearAll}>
                🗑️ Очистить
              </button>
            </div>
          </div>

          <div className="notifications-list">
            {filteredNotifications.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p>Нет уведомлений</p>
              </div>
            )}

            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className="notification-priority"
                  style={{ background: getPriorityColor(notification.priority) }}
                />

                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="notification-content">
                  <div className="notification-title">
                    {notification.title}
                    {!notification.read && <span className="unread-dot">•</span>}
                  </div>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">
                    {getRelativeTime(notification.timestamp)}
                  </div>
                </div>

                <button
                  className="notification-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="notifications-settings">
          <h3>Настройки уведомлений</h3>

          <div className="settings-section">
            <h4>Способы доставки</h4>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Email уведомления</div>
                  <div className="setting-description">
                    Получать уведомления на почту
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, emailNotifications: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Push уведомления</div>
                  <div className="setting-description">
                    Уведомления в браузере
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, pushNotifications: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">SMS уведомления</div>
                  <div className="setting-description">
                    Получать SMS о важных событиях
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, smsNotifications: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h4>Типы уведомлений</h4>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">💳 Транзакции</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.transactionAlerts}
                    onChange={(e) =>
                      setSettings({ ...settings, transactionAlerts: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">🔒 Безопасность</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.securityAlerts}
                    onChange={(e) =>
                      setSettings({ ...settings, securityAlerts: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">⚙️ Система</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.systemAlerts}
                    onChange={(e) =>
                      setSettings({ ...settings, systemAlerts: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">📦 Заказы</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.orderAlerts}
                    onChange={(e) =>
                      setSettings({ ...settings, orderAlerts: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">👤 Пользователи</div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.userAlerts}
                    onChange={(e) =>
                      setSettings({ ...settings, userAlerts: e.target.checked })
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn--primary btn--fullwidth">
            💾 Сохранить настройки
          </button>
        </div>
      </div>

      <style>{`
        .notifications-page {
          max-width: 1600px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-box {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .stat-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .notifications-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }

        @media (max-width: 1200px) {
          .notifications-layout {
            grid-template-columns: 1fr;
          }
        }

        .notifications-main {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .notifications-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tab {
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .tab:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #fff;
        }

        .tab.active {
          background: rgba(99, 102, 241, 0.2);
          color: #6366f1;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.75rem 1.25rem;
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

        .notifications-list {
          max-height: 700px;
          overflow-y: auto;
        }

        .notifications-list::-webkit-scrollbar {
          width: 6px;
        }

        .notifications-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .notification-item {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .notification-item:hover {
          background: rgba(99, 102, 241, 0.05);
        }

        .notification-item.unread {
          background: rgba(99, 102, 241, 0.08);
        }

        .notification-priority {
          width: 4px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-radius: 0 4px 4px 0;
        }

        .notification-icon {
          width: 48px;
          height: 48px;
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .unread-dot {
          color: #6366f1;
          font-size: 1.5rem;
          line-height: 1;
        }

        .notification-message {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .notification-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .notification-delete {
          width: 32px;
          height: 32px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          font-size: 1rem;
        }

        .notification-delete:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.125rem;
        }

        .notifications-settings {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .notifications-settings h3 {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
        }

        .settings-section {
          margin-bottom: 2rem;
        }

        .settings-section h4 {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          margin: 0 0 1rem 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .setting-item {
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
      `}</style>
    </div>
  );
}