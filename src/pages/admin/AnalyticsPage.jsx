import React, { useState, useEffect } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function AnalyticsPage() {
  const [products] = useLocalStorageArray("products", []);
  const [orders] = useLocalStorageArray("admin_orders", []);
  const [users] = useLocalStorageArray("admin_users", []);
  const [activity] = useLocalStorageArray("admin_activity", []);

  const [timeRange, setTimeRange] = useState("week");

  // Вычисляем аналитику
  const analytics = {
    totalRevenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.amount, 0),
    averageOrderValue:
      orders.length > 0
        ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length
        : 0,
    conversionRate:
      orders.length > 0 ? (orders.filter((o) => o.status === "completed").length / orders.length) * 100 : 0,
    topProducts: products
      .map((p) => ({
        ...p,
        orderCount: orders.filter((o) => o.product === p.name).length,
      }))
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5),
    recentActivity: activity.slice(0, 10),
    ordersByStatus: {
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    },
  };

  // Генерируем данные для графика продаж за последние 7 дней
  const salesData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayOrders = orders.filter((o) => {
      const orderDate = new Date(o.date);
      return orderDate.toDateString() === date.toDateString();
    });
    return {
      day: date.toLocaleDateString("ru-RU", { weekday: "short" }),
      orders: dayOrders.length,
      revenue: dayOrders.reduce((sum, o) => sum + o.amount, 0),
    };
  });

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue), 1);

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h2>📈 Аналитика и отчеты</h2>
        <p className="muted">Детальная статистика по продажам и активности</p>
      </div>

      <div className="time-range-selector">
        <button
          className={timeRange === "day" ? "range-btn active" : "range-btn"}
          onClick={() => setTimeRange("day")}
        >
          День
        </button>
        <button
          className={timeRange === "week" ? "range-btn active" : "range-btn"}
          onClick={() => setTimeRange("week")}
        >
          Неделя
        </button>
        <button
          className={timeRange === "month" ? "range-btn active" : "range-btn"}
          onClick={() => setTimeRange("month")}
        >
          Месяц
        </button>
        <button
          className={timeRange === "year" ? "range-btn active" : "range-btn"}
          onClick={() => setTimeRange("year")}
        >
          Год
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: "#10b981" }}>
            💰
          </div>
          <div className="metric-content">
            <div className="metric-label">Общая выручка</div>
            <div className="metric-value">
              {analytics.totalRevenue.toLocaleString("ru-RU")} ₸
            </div>
            <div className="metric-change positive">+12.5% за период</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: "#3b82f6" }}>
            📦
          </div>
          <div className="metric-content">
            <div className="metric-label">Всего заказов</div>
            <div className="metric-value">{orders.length}</div>
            <div className="metric-change positive">+8 за неделю</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: "#f59e0b" }}>
            💳
          </div>
          <div className="metric-content">
            <div className="metric-label">Средний чек</div>
            <div className="metric-value">
              {Math.round(analytics.averageOrderValue).toLocaleString("ru-RU")} ₸
            </div>
            <div className="metric-change negative">-2.3% за период</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: "#8b5cf6" }}>
            📊
          </div>
          <div className="metric-content">
            <div className="metric-label">Конверсия</div>
            <div className="metric-value">
              {analytics.conversionRate.toFixed(1)}%
            </div>
            <div className="metric-change positive">+5.2% за период</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>📈 Продажи за последние 7 дней</h3>
          <div className="bar-chart">
            {salesData.map((day, idx) => (
              <div key={idx} className="bar-column">
                <div
                  className="bar"
                  style={{
                    height: `${(day.revenue / maxRevenue) * 100}%`,
                    background: "linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)",
                  }}
                  title={`${day.revenue.toLocaleString("ru-RU")} ₸`}
                >
                  <span className="bar-value">
                    {day.revenue > 0 ? `${(day.revenue / 1000).toFixed(0)}k` : ""}
                  </span>
                </div>
                <div className="bar-label">{day.day}</div>
                <div className="bar-orders">{day.orders} заказов</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>📊 Статусы заказов</h3>
          <div className="status-chart">
            <div className="status-item">
              <div className="status-bar-wrapper">
                <div
                  className="status-bar"
                  style={{
                    width: `${(analytics.ordersByStatus.completed / orders.length) * 100}%`,
                    background: "#10b981",
                  }}
                />
              </div>
              <div className="status-info">
                <span className="status-label">Завершено</span>
                <span className="status-count">
                  {analytics.ordersByStatus.completed}
                </span>
              </div>
            </div>

            <div className="status-item">
              <div className="status-bar-wrapper">
                <div
                  className="status-bar"
                  style={{
                    width: `${(analytics.ordersByStatus.processing / orders.length) * 100}%`,
                    background: "#3b82f6",
                  }}
                />
              </div>
              <div className="status-info">
                <span className="status-label">В обработке</span>
                <span className="status-count">
                  {analytics.ordersByStatus.processing}
                </span>
              </div>
            </div>

            <div className="status-item">
              <div className="status-bar-wrapper">
                <div
                  className="status-bar"
                  style={{
                    width: `${(analytics.ordersByStatus.pending / orders.length) * 100}%`,
                    background: "#fbbf24",
                  }}
                />
              </div>
              <div className="status-info">
                <span className="status-label">Ожидают</span>
                <span className="status-count">
                  {analytics.ordersByStatus.pending}
                </span>
              </div>
            </div>

            <div className="status-item">
              <div className="status-bar-wrapper">
                <div
                  className="status-bar"
                  style={{
                    width: `${(analytics.ordersByStatus.cancelled / orders.length) * 100}%`,
                    background: "#ef4444",
                  }}
                />
              </div>
              <div className="status-info">
                <span className="status-label">Отменено</span>
                <span className="status-count">
                  {analytics.ordersByStatus.cancelled}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tables-section">
        <div className="table-card">
          <h3>🏆 Топ продуктов</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Продукт</th>
                <th>Категория</th>
                <th>Заказов</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topProducts.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className="badge">{p.orderCount}</span>
                  </td>
                  <td>{p.price.toLocaleString("ru-RU")} ₸</td>
                </tr>
              ))}
              {analytics.topProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="muted">
                    Нет данных о продуктах
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h3>📜 Недавняя активность</h3>
          <div className="activity-feed">
            {analytics.recentActivity.map((act, idx) => (
              <div key={idx} className="activity-item">
                <div className="activity-dot" />
                <div className="activity-content">
                  <div className="activity-type">{act.type}</div>
                  <div className="activity-message">{act.message}</div>
                  <div className="activity-time">{act.time}</div>
                </div>
              </div>
            ))}
            {analytics.recentActivity.length === 0 && (
              <p className="muted">Активность отсутствует</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .analytics-page {
          max-width: 1600px;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .time-range-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: rgba(26, 31, 58, 0.6);
          padding: 0.5rem;
          border-radius: 12px;
          width: fit-content;
        }

        .range-btn {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .range-btn:hover {
          color: #fff;
          background: rgba(99, 102, 241, 0.2);
        }

        .range-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .metric-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .metric-content {
          flex: 1;
        }

        .metric-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .metric-change {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .metric-change.positive {
          color: #10b981;
        }

        .metric-change.negative {
          color: #ef4444;
        }

        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .chart-card h3 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
        }

        .bar-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 250px;
          gap: 1rem;
          padding: 1rem 0;
        }

        .bar-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .bar {
          width: 100%;
          min-height: 20px;
          border-radius: 8px 8px 0 0;
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 0.5rem;
          transition: all 0.3s;
        }

        .bar:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }

        .bar-value {
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .bar-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .bar-orders {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .status-chart {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .status-bar-wrapper {
          width: 100%;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        .status-bar {
          height: 100%;
          border-radius: 8px;
          transition: width 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 1rem;
          color: #fff;
          font-weight: 600;
        }

        .status-info {
          display: flex;
          justify-content: space-between;
          color: #fff;
        }

        .status-label {
          font-size: 0.95rem;
        }

        .status-count {
          font-weight: 600;
        }

        .tables-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 1.5rem;
        }

        .table-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .table-card h3 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
        }

        .analytics-table {
          width: 100%;
          border-collapse: collapse;
        }

        .analytics-table th {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          text-align: left;
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .analytics-table td {
          color: #fff;
          padding: 1rem 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .badge {
          background: rgba(99, 102, 241, 0.2);
          color: #6366f1;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border-left: 3px solid #6366f1;
        }

        .activity-dot {
          width: 10px;
          height: 10px;
          background: #6366f1;
          border-radius: 50%;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-type {
          color: #6366f1;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .activity-message {
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .activity-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}