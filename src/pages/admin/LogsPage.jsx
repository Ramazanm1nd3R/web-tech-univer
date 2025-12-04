import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function LogsPage() {
  const [activity] = useLocalStorageArray("admin_activity", []);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  // Генерируем дополнительные логи для демонстрации
  const systemLogs = [
    {
      id: 1,
      level: "info",
      type: "SYSTEM_START",
      message: "Система запущена",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      user: "System",
    },
    {
      id: 2,
      level: "warning",
      type: "HIGH_MEMORY_USAGE",
      message: "Высокое использование памяти: 85%",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      user: "System",
    },
    {
      id: 3,
      level: "error",
      type: "API_ERROR",
      message: "Ошибка API запроса: timeout",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      user: "System",
    },
    {
      id: 4,
      level: "success",
      type: "BACKUP_COMPLETED",
      message: "Резервное копирование завершено успешно",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      user: "System",
    },
    {
      id: 5,
      level: "info",
      type: "USER_LOGIN",
      message: "Администратор вошел в систему",
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      user: "admin",
    },
  ];

  const allLogs = [
    ...activity.map((a, idx) => ({
      id: `activity-${idx}`,
      level: "info",
      type: a.type,
      message: a.message,
      timestamp: a.time,
      user: "admin",
    })),
    ...systemLogs,
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getLevelColor = (level) => {
    const colors = {
      info: "#3b82f6",
      success: "#10b981",
      warning: "#fbbf24",
      error: "#ef4444",
    };
    return colors[level] || "#6b7280";
  };

  const getLevelIcon = (level) => {
    const icons = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };
    return icons[level] || "📝";
  };

  const filteredLogs = allLogs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        log.message.toLowerCase().includes(term) ||
        log.type.toLowerCase().includes(term) ||
        log.user.toLowerCase().includes(term)
      );
    }
    if (timeFilter !== "all") {
      const logTime = new Date(log.timestamp);
      const now = new Date();
      if (timeFilter === "hour" && now - logTime > 3600000) return false;
      if (timeFilter === "day" && now - logTime > 86400000) return false;
      if (timeFilter === "week" && now - logTime > 604800000) return false;
    }
    return true;
  });

  const stats = {
    total: allLogs.length,
    info: allLogs.filter((l) => l.level === "info").length,
    warning: allLogs.filter((l) => l.level === "warning").length,
    error: allLogs.filter((l) => l.level === "error").length,
    success: allLogs.filter((l) => l.level === "success").length,
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `logs_${new Date().toISOString()}.json`;
    link.click();
  };

  const clearLogs = () => {
    if (window.confirm("Очистить все логи? Это действие нельзя отменить.")) {
      localStorage.removeItem("admin_activity");
      window.location.reload();
    }
  };

  return (
    <div className="logs-page">
      <div className="page-header">
        <div>
          <h2>📜 Логи системы</h2>
          <p className="muted">Мониторинг и отладка системных событий</p>
        </div>
        <div className="header-actions">
          <button className="btn btn--ghost" onClick={exportLogs}>
            📥 Экспорт
          </button>
          <button className="btn btn--danger" onClick={clearLogs}>
            🗑️ Очистить
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ borderColor: "#3b82f6" }}>
          <div className="stat-icon" style={{ color: "#3b82f6" }}>
            ℹ️
          </div>
          <div>
            <div className="stat-value">{stats.info}</div>
            <div className="stat-label">Информация</div>
          </div>
        </div>
        <div className="stat-card" style={{ borderColor: "#10b981" }}>
          <div className="stat-icon" style={{ color: "#10b981" }}>
            ✅
          </div>
          <div>
            <div className="stat-value">{stats.success}</div>
            <div className="stat-label">Успешно</div>
          </div>
        </div>
        <div className="stat-card" style={{ borderColor: "#fbbf24" }}>
          <div className="stat-icon" style={{ color: "#fbbf24" }}>
            ⚠️
          </div>
          <div>
            <div className="stat-value">{stats.warning}</div>
            <div className="stat-label">Предупреждения</div>
          </div>
        </div>
        <div className="stat-card" style={{ borderColor: "#ef4444" }}>
          <div className="stat-icon" style={{ color: "#ef4444" }}>
            ❌
          </div>
          <div>
            <div className="stat-value">{stats.error}</div>
            <div className="stat-label">Ошибки</div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по логам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Уровень:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Все</option>
            <option value="info">Информация</option>
            <option value="success">Успех</option>
            <option value="warning">Предупреждения</option>
            <option value="error">Ошибки</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Период:</label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">Весь период</option>
            <option value="hour">Последний час</option>
            <option value="day">Последний день</option>
            <option value="week">Последняя неделя</option>
          </select>
        </div>
      </div>

      <div className="logs-container">
        {filteredLogs.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>Логи не найдены</p>
          </div>
        )}

        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="log-entry"
            style={{ borderLeftColor: getLevelColor(log.level) }}
          >
            <div className="log-header">
              <div className="log-level">
                <span className="level-icon">{getLevelIcon(log.level)}</span>
                <span
                  className="level-badge"
                  style={{ background: getLevelColor(log.level) }}
                >
                  {log.level.toUpperCase()}
                </span>
              </div>
              <div className="log-timestamp">
                {new Date(log.timestamp).toLocaleString("ru-RU")}
              </div>
            </div>

            <div className="log-body">
              <div className="log-type">{log.type}</div>
              <div className="log-message">{log.message}</div>
            </div>

            <div className="log-footer">
              <span className="log-user">👤 {log.user}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredLogs.length > 0 && (
        <div className="logs-summary">
          Показано {filteredLogs.length} из {allLogs.length} записей
        </div>
      )}

      <style>{`
        .logs-page {
          max-width: 1400px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-header h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .filters-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
        }

        .search-box input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .filter-group select {
          padding: 0.875rem 1rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          min-width: 150px;
        }

        .logs-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .log-entry {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .log-entry:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .log-level {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .level-icon {
          font-size: 1.25rem;
        }

        .level-badge {
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .log-timestamp {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          font-family: 'Courier New', monospace;
        }

        .log-body {
          margin-bottom: 1rem;
        }

        .log-type {
          color: #6366f1;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-family: 'Courier New', monospace;
        }

        .log-message {
          color: #fff;
          line-height: 1.6;
        }

        .log-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .log-user {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .logs-summary {
          text-align: center;
          padding: 1rem;
          background: rgba(26, 31, 58, 0.6);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .empty-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
}