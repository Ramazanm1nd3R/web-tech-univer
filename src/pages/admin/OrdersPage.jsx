import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

const STATUS_COLORS = {
  pending: "#fbbf24",
  processing: "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

const STATUS_LABELS = {
  pending: "Ожидает",
  processing: "В обработке",
  completed: "Завершен",
  cancelled: "Отменен",
};

function createActivity(type, message) {
  return {
    type,
    message,
    time: new Date().toLocaleString(),
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useLocalStorageArray("admin_orders", [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customer: "Иван Иванов",
      email: "ivan@example.com",
      phone: "+7 777 123 4567",
      product: "Premium Card",
      amount: 15000,
      status: "pending",
      date: new Date().toISOString(),
      notes: "Срочный заказ",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customer: "Мария Петрова",
      email: "maria@example.com",
      phone: "+7 777 234 5678",
      product: "Депозит 12%",
      amount: 250000,
      status: "processing",
      date: new Date(Date.now() - 86400000).toISOString(),
      notes: "",
    },
  ]);
  
  const [activity, setActivity] = useLocalStorageArray("admin_activity", []);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (orderId, newStatus) => {
    const newOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(newOrders);
    
    const order = orders.find((o) => o.id === orderId);
    setActivity((prev) => [
      createActivity(
        "ORDER_STATUS_CHANGED",
        `Заказ ${order.orderNumber} изменен на "${STATUS_LABELS[newStatus]}"`
      ),
      ...prev,
    ]);
  };

  const deleteOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!window.confirm(`Удалить заказ ${order.orderNumber}?`)) return;
    
    setOrders(orders.filter((o) => o.id !== orderId));
    setActivity((prev) => [
      createActivity("ORDER_DELETED", `Удален заказ ${order.orderNumber}`),
      ...prev,
    ]);
  };

  const filteredOrders = orders
    .filter((order) => {
      if (filter !== "all" && order.status !== filter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.email.toLowerCase().includes(term) ||
          order.product.toLowerCase().includes(term)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    totalRevenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h2>Управление заказами</h2>
        <p className="muted">Обработка и мониторинг всех заказов</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-label">Всего заказов</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <div className="stat-label">Ожидают</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-info">
            <div className="stat-label">В обработке</div>
            <div className="stat-value">{stats.processing}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Выручка</div>
            <div className="stat-value">
              {stats.totalRevenue.toLocaleString("ru-RU")} ₸
            </div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по номеру, клиенту, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            Все
          </button>
          <button
            className={filter === "pending" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("pending")}
          >
            Ожидают
          </button>
          <button
            className={
              filter === "processing" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("processing")}
          >
            В обработке
          </button>
          <button
            className={
              filter === "completed" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("completed")}
          >
            Завершены
          </button>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Заказов не найдено</p>
          </div>
        )}

        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>{order.orderNumber}</h3>
                <p className="muted">{new Date(order.date).toLocaleString("ru-RU")}</p>
              </div>
              <div
                className="order-status"
                style={{ background: STATUS_COLORS[order.status] }}
              >
                {STATUS_LABELS[order.status]}
              </div>
            </div>

            <div className="order-body">
              <div className="order-info">
                <div className="info-row">
                  <span className="info-label">👤 Клиент:</span>
                  <span>{order.customer}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📧 Email:</span>
                  <span>{order.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📱 Телефон:</span>
                  <span>{order.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">🛍️ Продукт:</span>
                  <span>{order.product}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">💵 Сумма:</span>
                  <strong>{order.amount.toLocaleString("ru-RU")} ₸</strong>
                </div>
                {order.notes && (
                  <div className="info-row">
                    <span className="info-label">📝 Заметки:</span>
                    <span>{order.notes}</span>
                  </div>
                )}
              </div>

              <div className="order-actions">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Ожидает</option>
                  <option value="processing">В обработке</option>
                  <option value="completed">Завершен</option>
                  <option value="cancelled">Отменен</option>
                </select>
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  Подробнее
                </button>
                <button
                  className="btn btn--danger btn--sm"
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .orders-page {
          max-width: 1400px;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 600;
        }

        .filters-bar {
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

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.875rem 1.5rem;
          background: rgba(26, 31, 58, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          border-color: transparent;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .order-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .order-header h3 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
        }

        .order-status {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .order-body {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .order-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-row {
          display: flex;
          gap: 1rem;
          color: #fff;
        }

        .info-label {
          color: rgba(255, 255, 255, 0.6);
          min-width: 120px;
        }

        .order-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 200px;
        }

        .status-select {
          padding: 0.75rem;
          background: rgba(26, 31, 58, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 0.95rem;
        }

        .btn--sm {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .btn--ghost {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn--ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
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

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.5);
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .muted {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}