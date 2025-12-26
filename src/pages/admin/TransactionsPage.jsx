import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useLocalStorageArray("admin_transactions", [
    {
      id: 1,
      type: "deposit",
      amount: 50000,
      currency: "KZT",
      status: "completed",
      from: "Иван Иванов",
      to: "Счет #1234",
      date: new Date(Date.now() - 3600000).toISOString(),
      description: "Пополнение счета",
    },
    {
      id: 2,
      type: "transfer",
      amount: 25000,
      currency: "KZT",
      status: "pending",
      from: "Счет #1234",
      to: "Мария Петрова",
      date: new Date(Date.now() - 7200000).toISOString(),
      description: "Перевод другу",
    },
    {
      id: 3,
      type: "withdrawal",
      amount: 15000,
      currency: "KZT",
      status: "completed",
      from: "Счет #1234",
      to: "Банкомат",
      date: new Date(Date.now() - 86400000).toISOString(),
      description: "Снятие наличных",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getTypeIcon = (type) => {
    const icons = {
      deposit: "💰",
      transfer: "🔄",
      withdrawal: "🏧",
      payment: "💳",
    };
    return icons[type] || "💸";
  };

  const getTypeColor = (type) => {
    const colors = {
      deposit: "#10b981",
      transfer: "#3b82f6",
      withdrawal: "#f59e0b",
      payment: "#8b5cf6",
    };
    return colors[type] || "#6b7280";
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "#10b981",
      pending: "#fbbf24",
      failed: "#ef4444",
      cancelled: "#6b7280",
    };
    return colors[status] || "#6b7280";
  };

  const filteredTransactions = transactions
    .filter((tx) => {
      if (filter !== "all" && tx.type !== filter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          tx.from.toLowerCase().includes(term) ||
          tx.to.toLowerCase().includes(term) ||
          tx.description.toLowerCase().includes(term)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = {
    total: transactions.length,
    deposits: transactions.filter((t) => t.type === "deposit").length,
    transfers: transactions.filter((t) => t.type === "transfer").length,
    withdrawals: transactions.filter((t) => t.type === "withdrawal").length,
    totalVolume: transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h2>💳 Транзакции</h2>
        <p className="muted">История всех финансовых операций</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#6366f1" }}>
            📊
          </div>
          <div>
            <div className="stat-label">Всего операций</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#10b981" }}>
            💰
          </div>
          <div>
            <div className="stat-label">Пополнений</div>
            <div className="stat-value">{stats.deposits}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#3b82f6" }}>
            🔄
          </div>
          <div>
            <div className="stat-label">Переводов</div>
            <div className="stat-value">{stats.transfers}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f59e0b" }}>
            💸
          </div>
          <div>
            <div className="stat-label">Общий объем</div>
            <div className="stat-value">
              {(stats.totalVolume / 1000).toFixed(0)}K ₸
            </div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по отправителю, получателю..."
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
            className={filter === "deposit" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("deposit")}
          >
            Пополнения
          </button>
          <button
            className={filter === "transfer" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("transfer")}
          >
            Переводы
          </button>
          <button
            className={filter === "withdrawal" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("withdrawal")}
          >
            Снятия
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {filteredTransactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <p>Транзакции не найдены</p>
          </div>
        )}

        {filteredTransactions.map((tx) => (
          <div key={tx.id} className="transaction-card">
            <div
              className="transaction-icon"
              style={{ background: getTypeColor(tx.type) }}
            >
              {getTypeIcon(tx.type)}
            </div>

            <div className="transaction-info">
              <div className="transaction-description">{tx.description}</div>
              <div className="transaction-route">
                {tx.from} → {tx.to}
              </div>
              <div className="transaction-date">
                {new Date(tx.date).toLocaleString("ru-RU")}
              </div>
            </div>

            <div className="transaction-amount">
              <div
                className="amount-value"
                style={{
                  color:
                    tx.type === "deposit"
                      ? "#10b981"
                      : tx.type === "withdrawal"
                      ? "#ef4444"
                      : "#fff",
                }}
              >
                {tx.type === "deposit" ? "+" : tx.type === "withdrawal" ? "-" : ""}
                {tx.amount.toLocaleString("ru-RU")} {tx.currency}
              </div>
              <div
                className="transaction-status"
                style={{ background: getStatusColor(tx.status) }}
              >
                {tx.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .transactions-page {
          max-width: 1400px;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transaction-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.2s;
        }

        .transaction-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .transaction-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          flex-shrink: 0;
        }

        .transaction-info {
          flex: 1;
        }

        .transaction-description {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .transaction-route {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .transaction-date {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .transaction-status {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}