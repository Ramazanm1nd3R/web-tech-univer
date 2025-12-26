import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function DashboardWidget() {
  const { user, currencyRates, addPoints } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Генерация данных для графика
    const data = Array.from({ length: 7 }, (_, i) => ({
      day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
      income: Math.random() * 100000 + 50000,
      expense: Math.random() * 80000 + 30000,
    }));
    setChartData(data);
  }, []);

  const stats = {
    balance: 1250000,
    income: 450000,
    expense: 280000,
    savings: 970000,
    investments: 1800000,
    investmentChange: 12.5,
  };

  const recentTransactions = [
    { id: 1, type: 'income', title: 'Зарплата', amount: 450000, date: '2025-12-25', category: '💼' },
    { id: 2, type: 'expense', title: 'Продукты', amount: -15000, date: '2025-12-24', category: '🛒' },
    { id: 3, type: 'expense', title: 'Кафе', amount: -3500, date: '2025-12-24', category: '☕' },
    { id: 4, type: 'income', title: 'Дивиденды', amount: 8500, date: '2025-12-23', category: '📈' },
    { id: 5, type: 'expense', title: 'Такси', amount: -2000, date: '2025-12-23', category: '🚕' },
  ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expense)));

  if (!user) return null;

  return (
    <div className="dashboard-widget">
      <div className="dashboard-header">
        <div>
          <h2>👋 Привет, {user.name || 'Пользователь'}!</h2>
          <p>Вот обзор ваших финансов</p>
        </div>
        <div className="quick-actions">
          <button className="quick-btn" onClick={() => addPoints(10)}>
            💸 Перевод
          </button>
          <button className="quick-btn" onClick={() => addPoints(10)}>
            📊 Отчет
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          📊 Обзор
        </button>
        <button 
          className={activeTab === 'analytics' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Аналитика
        </button>
        <button 
          className={activeTab === 'transactions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('transactions')}
        >
          💳 Операции
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card primary">
              <span className="stat-icon">💰</span>
              <div>
                <p className="stat-label">Баланс</p>
                <h3 className="stat-value">{stats.balance.toLocaleString()} ₸</h3>
              </div>
            </div>

            <div className="stat-card success">
              <span className="stat-icon">📈</span>
              <div>
                <p className="stat-label">Доход</p>
                <h3 className="stat-value">+{stats.income.toLocaleString()} ₸</h3>
              </div>
            </div>

            <div className="stat-card danger">
              <span className="stat-icon">📉</span>
              <div>
                <p className="stat-label">Расход</p>
                <h3 className="stat-value">-{stats.expense.toLocaleString()} ₸</h3>
              </div>
            </div>

            <div className="stat-card warning">
              <span className="stat-icon">🎯</span>
              <div>
                <p className="stat-label">Накопления</p>
                <h3 className="stat-value">{stats.savings.toLocaleString()} ₸</h3>
              </div>
            </div>
          </div>

          <div className="investment-card">
            <div className="investment-header">
              <div>
                <h4>📊 Инвестиции</h4>
                <p className="investment-value">{stats.investments.toLocaleString()} ₸</p>
              </div>
              <div className="investment-change positive">
                ↗ +{stats.investmentChange}%
              </div>
            </div>
            <div className="investment-chart">
              <div className="mini-chart">
                {[65, 59, 80, 81, 56, 55, 70, 85, 90, 75, 88, 95].map((val, i) => (
                  <div 
                    key={i}
                    className="chart-bar"
                    style={{ height: `${val}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="dashboard-content">
          <div className="chart-container">
            <h4>Доходы и расходы за неделю</h4>
            <div className="bar-chart">
              {chartData.map((item, idx) => (
                <div key={idx} className="chart-column">
                  <div className="chart-bars">
                    <div 
                      className="bar income"
                      style={{ height: `${(item.income / maxValue) * 200}px` }}
                      title={`Доход: ${item.income.toLocaleString()} ₸`}
                    ></div>
                    <div 
                      className="bar expense"
                      style={{ height: `${(item.expense / maxValue) * 200}px` }}
                      title={`Расход: ${item.expense.toLocaleString()} ₸`}
                    ></div>
                  </div>
                  <span className="chart-label">{item.day}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color income"></span>
                Доходы
              </div>
              <div className="legend-item">
                <span className="legend-color expense"></span>
                Расходы
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="dashboard-content">
          <div className="transactions-list">
            <h4>Последние операции</h4>
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <span className="transaction-category">{transaction.category}</span>
                <div className="transaction-info">
                  <h5>{transaction.title}</h5>
                  <p>{new Date(transaction.date).toLocaleDateString('ru-RU')}</p>
                </div>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} ₸
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .dashboard-widget {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-header h2 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
        }

        .dashboard-header p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .quick-actions {
          display: flex;
          gap: 0.75rem;
        }

        .quick-btn {
          padding: 0.75rem 1.25rem;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .quick-btn:hover {
          background: rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
        }

        .dashboard-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1rem;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .tab:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .tab.active {
          background: rgba(99, 102, 241, 0.2);
          color: #6366f1;
        }

        .dashboard-content {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid;
        }

        .stat-card.primary {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .stat-card.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .stat-card.danger {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .stat-card.warning {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
        }

        .stat-value {
          color: #fff;
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .investment-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .investment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .investment-header h4 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 1.125rem;
        }

        .investment-value {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .investment-change {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.125rem;
        }

        .investment-change.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .mini-chart {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 60px;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
          border-radius: 2px 2px 0 0;
          transition: all 0.3s;
        }

        .chart-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .chart-container h4 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.125rem;
        }

        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 1rem;
          height: 200px;
          margin-bottom: 1rem;
        }

        .chart-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          width: 100%;
          justify-content: center;
        }

        .bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: all 0.3s;
        }

        .bar.income {
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
        }

        .bar.expense {
          background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
        }

        .bar:hover {
          opacity: 0.8;
        }

        .chart-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .chart-legend {
          display: flex;
          gap: 2rem;
          justify-content: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .legend-color.income {
          background: #10b981;
        }

        .legend-color.expense {
          background: #ef4444;
        }

        .transactions-list {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .transactions-list h4 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.125rem;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.2s;
        }

        .transaction-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .transaction-category {
          font-size: 2rem;
        }

        .transaction-info {
          flex: 1;
        }

        .transaction-info h5 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }

        .transaction-info p {
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          font-size: 0.875rem;
        }

        .transaction-amount {
          font-size: 1.125rem;
          font-weight: 700;
        }

        .transaction-amount.income {
          color: #10b981;
        }

        .transaction-amount.expense {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .dashboard-widget {
            padding: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .quick-actions {
            width: 100%;
          }

          .quick-btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}