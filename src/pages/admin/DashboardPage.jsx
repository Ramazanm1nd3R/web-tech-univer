import React, { useEffect, useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [products] = useLocalStorageArray("products", []);
  const [users] = useLocalStorageArray("admin_users", []);
  const [activity] = useLocalStorageArray("admin_activity", []);
  const [orders] = useLocalStorageArray("admin_orders", []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Расчет статистики
  const stats = {
    products: products.length,
    users: users.length,
    activity: activity.length,
    orders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "completed").length,
    totalRevenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.amount, 0),
    todayRevenue: orders
      .filter((o) => {
        const orderDate = new Date(o.date);
        const today = new Date();
        return (
          o.status === "completed" &&
          orderDate.toDateString() === today.toDateString()
        );
      })
      .reduce((sum, o) => sum + o.amount, 0),
  };

  // Последние события
  const recentActivity = activity.slice(0, 5);

  // Быстрые ссылки
  const quickLinks = [
    { to: "/admin/products", icon: "🛍️", label: "Продукты", color: "#6366f1" },
    { to: "/admin/orders", icon: "📦", label: "Заказы", color: "#3b82f6" },
    { to: "/admin/users", icon: "👥", label: "Пользователи", color: "#8b5cf6" },
    { to: "/admin/analytics", icon: "📈", label: "Аналитика", color: "#10b981" },
  ];

  // Системная информация
  const systemInfo = {
    version: "2.0.1",
    uptime: "15 дней 8 часов",
    storage: "2.4 GB / 10 GB",
    cpu: "45%",
    memory: "68%",
  };

  return (
    <div className="dashboard-page-new">
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>👋 Добро пожаловать, Администратор!</h2>
          <p className="welcome-time">
            {currentTime.toLocaleDateString("ru-RU", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" • "}
            {currentTime.toLocaleTimeString("ru-RU")}
          </p>
        </div>
        <div className="quick-actions">
          <button className="quick-btn">
            ➕ Создать
          </button>
          <button className="quick-btn">
            📊 Отчет
          </button>
        </div>
      </div>

      <div className="main-stats-grid">
        <Link to="/admin/products" className="stat-card-new">
          <div className="stat-icon-new" style={{ background: "#6366f1" }}>
            🛍️
          </div>
          <div className="stat-content-new">
            <div className="stat-label-new">Продуктов</div>
            <div className="stat-value-new">{stats.products}</div>
            <div className="stat-change-new positive">+3 за месяц</div>
          </div>
        </Link>

        <Link to="/admin/orders" className="stat-card-new">
          <div className="stat-icon-new" style={{ background: "#3b82f6" }}>
            📦
          </div>
          <div className="stat-content-new">
            <div className="stat-label-new">Заказов</div>
            <div className="stat-value-new">{stats.orders}</div>
            <div className="stat-change-new positive">
              {stats.pendingOrders} ожидают
            </div>
          </div>
        </Link>

        <Link to="/admin/users" className="stat-card-new">
          <div className="stat-icon-new" style={{ background: "#8b5cf6" }}>
            👥
          </div>
          <div className="stat-content-new">
            <div className="stat-label-new">Пользователей</div>
            <div className="stat-value-new">{stats.users}</div>
            <div className="stat-change-new positive">+2 за неделю</div>
          </div>
        </Link>

        <Link to="/admin/analytics" className="stat-card-new">
          <div className="stat-icon-new" style={{ background: "#10b981" }}>
            💰
          </div>
          <div className="stat-content-new">
            <div className="stat-label-new">Выручка</div>
            <div className="stat-value-new">
              {(stats.totalRevenue / 1000).toFixed(0)}K ₸
            </div>
            <div className="stat-change-new positive">+12.5% за месяц</div>
          </div>
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📊 Обзор продаж</h3>
            <Link to="/admin/analytics" className="card-link">
              Подробнее →
            </Link>
          </div>
          <div className="sales-overview">
            <div className="sales-item">
              <div className="sales-label">Сегодня</div>
              <div className="sales-value">
                {stats.todayRevenue.toLocaleString("ru-RU")} ₸
              </div>
            </div>
            <div className="sales-item">
              <div className="sales-label">Завершено</div>
              <div className="sales-value">{stats.completedOrders}</div>
            </div>
            <div className="sales-item">
              <div className="sales-label">В обработке</div>
              <div className="sales-value">
                {stats.orders - stats.completedOrders}
              </div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Цель месяца: 1,000,000 ₸</span>
              <span>{((stats.totalRevenue / 1000000) * 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min((stats.totalRevenue / 1000000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>⚡ Быстрые ссылки</h3>
          </div>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="quick-link-card"
                style={{ borderColor: link.color }}
              >
                <div className="quick-link-icon" style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className="quick-link-label">{link.label}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h3>🔔 Последние изменения</h3>
            <Link to="/admin/logs" className="card-link">
              Все логи →
            </Link>
          </div>
          <div className="activity-feed">
            {recentActivity.length === 0 && (
              <p className="muted">Пока изменений нет.</p>
            )}
            {recentActivity.map((a, idx) => (
              <div key={idx} className="activity-item-new">
                <div className="activity-dot" />
                <div className="activity-details">
                  <div className="activity-type-new">{a.type}</div>
                  <div className="activity-message-new">{a.message}</div>
                  <div className="activity-time-new">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>💻 Система</h3>
          </div>
          <div className="system-info">
            <div className="system-item">
              <span className="system-label">Версия:</span>
              <span className="system-value">{systemInfo.version}</span>
            </div>
            <div className="system-item">
              <span className="system-label">Аптайм:</span>
              <span className="system-value">{systemInfo.uptime}</span>
            </div>
            <div className="system-item">
              <span className="system-label">Хранилище:</span>
              <span className="system-value">{systemInfo.storage}</span>
            </div>
            <div className="system-metrics">
              <div className="metric-item">
                <div className="metric-label">CPU</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{
                      width: systemInfo.cpu,
                      background: "#3b82f6",
                    }}
                  />
                </div>
                <div className="metric-value">{systemInfo.cpu}</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">RAM</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{
                      width: systemInfo.memory,
                      background: "#8b5cf6",
                    }}
                  />
                </div>
                <div className="metric-value">{systemInfo.memory}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page-new {
          max-width: 1600px;
        }

        .welcome-section {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .welcome-content h2 {
          color: #fff;
          font-size: 1.75rem;
          margin: 0 0 0.5rem 0;
        }

        .welcome-time {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
        }

        .quick-actions {
          display: flex;
          gap: 0.5rem;
        }

        .quick-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .quick-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .main-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card-new {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .stat-card-new::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .stat-card-new:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
        }

        .stat-card-new:hover::before {
          opacity: 1;
        }

        .stat-icon-new {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          flex-shrink: 0;
          z-index: 1;
        }

        .stat-content-new {
          flex: 1;
          z-index: 1;
        }

        .stat-label-new {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .stat-value-new {
          color: #fff;
          font-size: 2rem;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-change-new {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stat-change-new.positive {
          color: #10b981;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .dashboard-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .activity-card {
          grid-column: span 2;
        }

        @media (max-width: 1200px) {
          .activity-card {
            grid-column: span 1;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-header h3 {
          color: #fff;
          font-size: 1.125rem;
          margin: 0;
        }

        .card-link {
          color: #6366f1;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .card-link:hover {
          color: #8b5cf6;
        }

        .sales-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .sales-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .sales-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .sales-value {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .progress-section {
          margin-top: 1.5rem;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .quick-link-card {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
        }

        .quick-link-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .quick-link-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .quick-link-label {
          color: #fff;
          font-weight: 500;
        }

        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item-new {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .activity-item-new:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .activity-dot {
          width: 10px;
          height: 10px;
          background: #6366f1;
          border-radius: 50%;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .activity-details {
          flex: 1;
        }

        .activity-type-new {
          color: #6366f1;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .activity-message-new {
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .activity-time-new {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .system-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .system-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .system-label {
          color: rgba(255, 255, 255, 0.6);
        }

        .system-value {
          color: #fff;
          font-weight: 500;
        }

        .system-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .metric-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          min-width: 40px;
        }

        .metric-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .metric-value {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          min-width: 45px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}