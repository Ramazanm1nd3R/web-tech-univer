import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function CardsManagementPage() {
  const [cards, setCards] = useLocalStorageArray("admin_cards", [
    {
      id: 1,
      cardNumber: "**** **** **** 1234",
      cardType: "Visa",
      holder: "Иван Иванов",
      balance: 450000,
      currency: "KZT",
      status: "active",
      issueDate: "2024-01-15",
      expiryDate: "2027-01-31",
      cardLevel: "Premium",
      cashback: 5,
      limit: 1000000,
    },
    {
      id: 2,
      cardNumber: "**** **** **** 5678",
      cardType: "Mastercard",
      holder: "Мария Петрова",
      balance: 280000,
      currency: "KZT",
      status: "active",
      issueDate: "2024-02-10",
      expiryDate: "2027-02-28",
      cardLevel: "Gold",
      cashback: 3,
      limit: 500000,
    },
    {
      id: 3,
      cardNumber: "**** **** **** 9012",
      cardType: "Visa",
      holder: "Петр Сидоров",
      balance: 15000,
      currency: "KZT",
      status: "blocked",
      issueDate: "2023-11-20",
      expiryDate: "2026-11-30",
      cardLevel: "Classic",
      cashback: 1,
      limit: 200000,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const getCardIcon = (type) => {
    const icons = {
      Visa: "💳",
      Mastercard: "💎",
      AmEx: "💰",
    };
    return icons[type] || "💳";
  };

  const getCardGradient = (level) => {
    const gradients = {
      Premium: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
      Gold: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      Classic: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    };
    return gradients[level] || gradients.Classic;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "#10b981",
      blocked: "#ef4444",
      expired: "#6b7280",
    };
    return colors[status] || "#6b7280";
  };

  const updateCardStatus = (id, newStatus) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, status: newStatus } : card
    ));
  };

  const filteredCards = cards.filter(card => {
    if (filter !== "all" && card.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        card.holder.toLowerCase().includes(term) ||
        card.cardNumber.includes(term) ||
        card.cardType.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const stats = {
    total: cards.length,
    active: cards.filter(c => c.status === "active").length,
    blocked: cards.filter(c => c.status === "blocked").length,
    totalBalance: cards.reduce((sum, c) => sum + c.balance, 0),
    totalLimit: cards.reduce((sum, c) => sum + c.limit, 0),
  };

  return (
    <div className="cards-management-page">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#6366f1" }}>
            💳
          </div>
          <div>
            <div className="stat-label">Всего карт</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#10b981" }}>
            ✓
          </div>
          <div>
            <div className="stat-label">Активных</div>
            <div className="stat-value">{stats.active}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#ef4444" }}>
            🔒
          </div>
          <div>
            <div className="stat-label">Заблокировано</div>
            <div className="stat-value">{stats.blocked}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f59e0b" }}>
            💰
          </div>
          <div>
            <div className="stat-label">Общий баланс</div>
            <div className="stat-value">
              {(stats.totalBalance / 1000).toFixed(0)}K ₸
            </div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по держателю, номеру карты..."
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
            className={filter === "active" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("active")}
          >
            Активные
          </button>
          <button
            className={filter === "blocked" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("blocked")}
          >
            Заблокированные
          </button>
        </div>

        <button className="btn btn--primary">
          ➕ Выпустить карту
        </button>
      </div>

      <div className="cards-grid">
        {filteredCards.map((card) => (
          <div key={card.id} className="bank-card">
            <div 
              className="card-background"
              style={{ background: getCardGradient(card.cardLevel) }}
            >
              <div className="card-header">
                <div className="card-type">
                  {getCardIcon(card.cardType)} {card.cardType}
                </div>
                <div className="card-level">{card.cardLevel}</div>
              </div>

              <div className="card-number">{card.cardNumber}</div>

              <div className="card-footer">
                <div className="card-holder">
                  <div className="card-label">Держатель</div>
                  <div className="card-value">{card.holder}</div>
                </div>
                <div className="card-expiry">
                  <div className="card-label">Срок</div>
                  <div className="card-value">
                    {new Date(card.expiryDate).toLocaleDateString("ru-RU", {
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-info">
              <div className="info-row">
                <span className="info-label">Баланс:</span>
                <span className="info-value">
                  {card.balance.toLocaleString("ru-RU")} {card.currency}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Лимит:</span>
                <span className="info-value">
                  {card.limit.toLocaleString("ru-RU")} {card.currency}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Кешбэк:</span>
                <span className="info-value">{card.cashback}%</span>
              </div>
              <div className="info-row">
                <span className="info-label">Статус:</span>
                <span 
                  className="status-badge"
                  style={{ background: getStatusColor(card.status) }}
                >
                  {card.status === "active" ? "Активна" : "Заблокирована"}
                </span>
              </div>
            </div>

            <div className="card-actions">
              {card.status === "active" ? (
                <button 
                  className="btn btn--danger btn--sm"
                  onClick={() => updateCardStatus(card.id, "blocked")}
                >
                  🔒 Заблокировать
                </button>
              ) : (
                <button 
                  className="btn btn--primary btn--sm"
                  onClick={() => updateCardStatus(card.id, "active")}
                >
                  ✓ Разблокировать
                </button>
              )}
              <button 
                className="btn btn--ghost btn--sm"
                onClick={() => setSelectedCard(card)}
              >
                📊 Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .cards-management-page {
          max-width: 1600px;
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
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          flex-shrink: 0;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .filters-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
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

        .btn--ghost {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn--danger {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .btn--sm {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2rem;
        }

        .bank-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .bank-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
        }

        .card-background {
          border-radius: 12px;
          padding: 1.5rem;
          color: #fff;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .card-background::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .card-type {
          font-size: 1.125rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-level {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .card-number {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          font-family: 'Courier New', monospace;
        }

        .card-footer {
          display: flex;
          gap: 2rem;
        }

        .card-holder,
        .card-expiry {
          flex: 1;
        }

        .card-label {
          font-size: 0.75rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.25rem;
        }

        .card-value {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .info-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }

        .info-value {
          color: #fff;
          font-weight: 600;
        }

        .status-badge {
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .card-actions button {
          flex: 1;
        }
      `}</style>
    </div>
  );
}