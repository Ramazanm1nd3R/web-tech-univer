import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function LoansManagementPage() {
  const [loans, setLoans] = useLocalStorageArray("admin_loans", [
    {
      id: 1,
      clientName: "Иван Иванов",
      loanType: "Потребительский",
      amount: 3000000,
      term: 36,
      rate: 12.9,
      monthlyPayment: 100890,
      remainingDebt: 2400000,
      status: "active",
      startDate: "2024-01-15",
      nextPayment: "2025-01-15",
    },
    {
      id: 2,
      clientName: "Мария Петрова",
      loanType: "Ипотека",
      amount: 50000000,
      term: 240,
      rate: 6.9,
      monthlyPayment: 385000,
      remainingDebt: 48500000,
      status: "active",
      startDate: "2024-03-01",
      nextPayment: "2025-01-01",
    },
    {
      id: 3,
      clientName: "Петр Сидоров",
      loanType: "Автокредит",
      amount: 8000000,
      term: 60,
      rate: 8.9,
      monthlyPayment: 165000,
      remainingDebt: 7200000,
      status: "active",
      startDate: "2024-06-10",
      nextPayment: "2025-01-10",
    },
    {
      id: 4,
      clientName: "Анна Кузнецова",
      loanType: "Потребительский",
      amount: 1500000,
      term: 24,
      rate: 12.9,
      monthlyPayment: 71500,
      remainingDebt: 0,
      status: "closed",
      startDate: "2023-01-01",
      nextPayment: null,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getLoanIcon = (type) => {
    const icons = {
      "Потребительский": "🛍️",
      "Автокредит": "🚗",
      "Ипотека": "🏠",
      "Бизнес-кредит": "💼",
    };
    return icons[type] || "💰";
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "#10b981",
      overdue: "#ef4444",
      closed: "#6b7280",
      pending: "#fbbf24",
    };
    return colors[status] || "#6b7280";
  };

  const filteredLoans = loans.filter(loan => {
    if (filter !== "all" && loan.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        loan.clientName.toLowerCase().includes(term) ||
        loan.loanType.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const stats = {
    total: loans.length,
    active: loans.filter(l => l.status === "active").length,
    closed: loans.filter(l => l.status === "closed").length,
    totalIssued: loans.reduce((sum, l) => sum + l.amount, 0),
    totalRemaining: loans.filter(l => l.status === "active").reduce((sum, l) => sum + l.remainingDebt, 0),
  };

  return (
    <div className="loans-management-page">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#6366f1" }}>
            💰
          </div>
          <div>
            <div className="stat-label">Всего кредитов</div>
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
          <div className="stat-icon" style={{ background: "#6b7280" }}>
            🔒
          </div>
          <div>
            <div className="stat-label">Закрытых</div>
            <div className="stat-value">{stats.closed}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f59e0b" }}>
            💸
          </div>
          <div>
            <div className="stat-label">Остаток долга</div>
            <div className="stat-value">
              {(stats.totalRemaining / 1000000).toFixed(1)}M ₸
            </div>
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по клиенту, типу кредита..."
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
            className={filter === "closed" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("closed")}
          >
            Закрытые
          </button>
        </div>

        <button className="btn btn--primary">
          ➕ Новый кредит
        </button>
      </div>

      <div className="loans-list">
        {filteredLoans.map((loan) => (
          <div key={loan.id} className="loan-item">
            <div className="loan-header">
              <div className="loan-client">
                <div className="loan-icon">
                  {getLoanIcon(loan.loanType)}
                </div>
                <div>
                  <h3>{loan.clientName}</h3>
                  <p className="loan-type">{loan.loanType}</p>
                </div>
              </div>
              <div 
                className="loan-status"
                style={{ background: getStatusColor(loan.status) }}
              >
                {loan.status === "active" ? "Активен" : loan.status === "closed" ? "Закрыт" : loan.status}
              </div>
            </div>

            <div className="loan-details">
              <div className="detail-item">
                <span className="detail-label">Сумма кредита</span>
                <span className="detail-value">
                  {loan.amount.toLocaleString("ru-RU")} ₸
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Остаток долга</span>
                <span className="detail-value">
                  {loan.remainingDebt.toLocaleString("ru-RU")} ₸
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ежемесячный платеж</span>
                <span className="detail-value">
                  {loan.monthlyPayment.toLocaleString("ru-RU")} ₸
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ставка</span>
                <span className="detail-value">{loan.rate}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Срок</span>
                <span className="detail-value">{loan.term} мес.</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Начало</span>
                <span className="detail-value">
                  {new Date(loan.startDate).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>

            {loan.status === "active" && (
              <div className="loan-progress">
                <div className="progress-label">
                  <span>Погашено</span>
                  <span>
                    {Math.round(((loan.amount - loan.remainingDebt) / loan.amount) * 100)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${((loan.amount - loan.remainingDebt) / loan.amount) * 100}%` 
                    }}
                  />
                </div>
              </div>
            )}

            <div className="loan-actions">
              <button className="btn btn--ghost btn--sm">
                📊 Подробнее
              </button>
              <button className="btn btn--ghost btn--sm">
                📄 График платежей
              </button>
              {loan.status === "active" && (
                <button className="btn btn--ghost btn--sm">
                  💸 Досрочное погашение
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .loans-management-page {
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

        .btn--sm {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }

        .loans-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loan-item {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.2s;
        }

        .loan-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .loan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .loan-client {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .loan-icon {
          width: 50px;
          height: 50px;
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .loan-client h3 {
          color: #fff;
          font-size: 1.25rem;
          margin: 0 0 0.25rem 0;
        }

        .loan-type {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.95rem;
        }

        .loan-status {
          padding: 0.5rem 1rem;
          border-radius: 12px;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .loan-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .detail-value {
          color: #fff;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .loan-progress {
          margin-bottom: 1.5rem;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
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
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .loan-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}