



// import React from 'react';

// // Единая система стилей для всей админ-панели
// export default function UnifiedAdminStyles() {
//   return (
//     <div className="style-guide">
//       <h1>🎨 Unified Admin Design System</h1>
      
//       <section className="guide-section">
//         <h2>1. Общие компоненты</h2>
//         <div className="component-preview">
//           <button className="btn btn--primary">Primary Button</button>
//           <button className="btn btn--ghost">Ghost Button</button>
//           <button className="btn btn--danger">Danger Button</button>
//         </div>
//       </section>

//       <section className="guide-section">
//         <h2>2. Карточки</h2>
//         <div className="card-preview">
//           <div className="admin-card">
//             <h3>Standard Card</h3>
//             <p>Используется для всех секций</p>
//           </div>
//         </div>
//       </section>

//       <section className="guide-section">
//         <h2>3. Формы</h2>
//         <div className="form-preview">
//           <div className="form-field">
//             <label>Стандартное поле</label>
//             <input type="text" placeholder="Введите текст..." />
//           </div>
//         </div>
//       </section>

//       <style>{`
//         /* ============================================
//            🎯 UNIFIED ADMIN PANEL STYLES
//            Применяется ко всем страницам админки
//         ============================================ */

//         /* ROOT VARIABLES - Единая цветовая схема */
//         :root {
//           --admin-bg-1: #0a0f1e;
//           --admin-bg-2: #111827;
//           --admin-bg-3: #1a1f3a;
//           --admin-bg-4: #2a2f4a;
          
//           --admin-text: #eff7ff;
//           --admin-text-muted: #9fb5cc;
//           --admin-text-dim: #6b7280;
          
//           --admin-accent: #6366f1;
//           --admin-accent-2: #8b5cf6;
//           --admin-accent-hover: #7c3aed;
          
//           --admin-success: #10b981;
//           --admin-warning: #fbbf24;
//           --admin-danger: #ef4444;
//           --admin-info: #3b82f6;
          
//           --admin-border: rgba(255, 255, 255, 0.1);
//           --admin-border-focus: rgba(99, 102, 241, 0.5);
          
//           --admin-glass: rgba(255, 255, 255, 0.05);
//           --admin-glass-hover: rgba(255, 255, 255, 0.08);
          
//           --admin-radius-sm: 8px;
//           --admin-radius-md: 12px;
//           --admin-radius-lg: 16px;
          
//           --admin-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
//           --admin-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
//           --admin-glow: 0 0 20px rgba(99, 102, 241, 0.3);
//         }

//         /* ============================================
//            📦 UNIFIED CARD COMPONENT
//         ============================================ */
//         .admin-card,
//         .dashboard-card,
//         .section-card,
//         .chart-card,
//         .table-card,
//         .stat-card,
//         .settings-section,
//         .order-card,
//         .file-card,
//         .log-entry,
//         .profile-card {
//           background: linear-gradient(135deg, var(--admin-bg-3) 0%, var(--admin-bg-4) 100%);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-md);
//           padding: 1.5rem;
//           transition: all 0.3s ease;
//         }

//         .admin-card:hover,
//         .dashboard-card:hover,
//         .stat-card:hover,
//         .order-card:hover,
//         .file-card:hover {
//           transform: translateY(-2px);
//           box-shadow: var(--admin-shadow-lg), var(--admin-glow);
//           border-color: rgba(99, 102, 241, 0.3);
//         }

//         /* ============================================
//            🎨 UNIFIED BUTTONS
//         ============================================ */
//         .btn,
//         .action-btn,
//         .table-btn,
//         .filter-btn,
//         .range-btn,
//         .view-btn,
//         .toggle-details,
//         .submit-btn,
//         .quick-btn,
//         .auth-submit {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           padding: 0.75rem 1.25rem;
//           border-radius: var(--admin-radius-sm);
//           font-weight: 600;
//           font-size: 0.95rem;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           border: 1px solid transparent;
//           white-space: nowrap;
//         }

//         /* Primary Button */
//         .btn--primary,
//         .auth-submit,
//         .submit-btn {
//           background: linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-2) 100%);
//           color: #fff;
//           border: none;
//           box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
//         }

//         .btn--primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
//         }

//         .btn--primary:active {
//           transform: translateY(0);
//         }

//         /* Ghost Button */
//         .btn--ghost {
//           background: var(--admin-glass);
//           color: var(--admin-text);
//           border: 1px solid var(--admin-border);
//         }

//         .btn--ghost:hover {
//           background: var(--admin-glass-hover);
//           border-color: var(--admin-accent);
//           color: var(--admin-accent);
//         }

//         /* Danger Button */
//         .btn--danger,
//         .table-btn--danger {
//           background: rgba(239, 68, 68, 0.15);
//           color: var(--admin-danger);
//           border: 1px solid var(--admin-danger);
//         }

//         .btn--danger:hover {
//           background: var(--admin-danger);
//           color: #fff;
//           box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
//         }

//         /* Small Buttons */
//         .btn--sm,
//         .table-btn,
//         .action-btn {
//           padding: 0.5rem 1rem;
//           font-size: 0.875rem;
//         }

//         /* Icon-only buttons */
//         .action-btn {
//           width: 36px;
//           height: 36px;
//           padding: 0;
//           background: var(--admin-glass);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-sm);
//           color: var(--admin-text);
//         }

//         .action-btn:hover {
//           background: rgba(99, 102, 241, 0.2);
//           border-color: var(--admin-accent);
//           color: var(--admin-accent);
//         }

//         /* Filter & Toggle Buttons */
//         .filter-btn,
//         .range-btn,
//         .view-btn {
//           background: var(--admin-glass);
//           border: 1px solid var(--admin-border);
//           color: var(--admin-text-muted);
//         }

//         .filter-btn:hover,
//         .range-btn:hover,
//         .view-btn:hover {
//           background: var(--admin-glass-hover);
//           color: var(--admin-text);
//         }

//         .filter-btn.active,
//         .range-btn.active,
//         .view-btn.active {
//           background: linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-2) 100%);
//           color: #fff;
//           border-color: transparent;
//         }

//         /* ============================================
//            📝 UNIFIED FORM INPUTS
//         ============================================ */
//         .form-field,
//         .input-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }

//         .form-field label,
//         .input-group label {
//           color: var(--admin-text);
//           font-size: 0.95rem;
//           font-weight: 500;
//         }

//         input[type="text"],
//         input[type="email"],
//         input[type="password"],
//         input[type="number"],
//         input[type="tel"],
//         textarea,
//         select,
//         .search-box input,
//         .status-select {
//           width: 100%;
//           padding: 0.875rem 1rem;
//           background: rgba(10, 14, 39, 0.6);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-sm);
//           color: var(--admin-text);
//           font-size: 0.95rem;
//           transition: all 0.2s ease;
//         }

//         input:focus,
//         textarea:focus,
//         select:focus {
//           outline: none;
//           border-color: var(--admin-accent);
//           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
//           background: rgba(10, 14, 39, 0.8);
//         }

//         input::placeholder,
//         textarea::placeholder {
//           color: var(--admin-text-dim);
//         }

//         /* ============================================
//            📊 UNIFIED TABLES
//         ============================================ */
//         .crud-table,
//         .analytics-table,
//         .files-table {
//           width: 100%;
//           background: linear-gradient(135deg, var(--admin-bg-3) 0%, var(--admin-bg-4) 100%);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-md);
//           overflow: hidden;
//           border-collapse: separate;
//           border-spacing: 0;
//         }

//         .crud-table th,
//         .analytics-table th,
//         .files-table th {
//           background: rgba(0, 0, 0, 0.3);
//           color: var(--admin-text-muted);
//           font-weight: 600;
//           text-align: left;
//           padding: 1rem;
//           border-bottom: 1px solid var(--admin-border);
//           font-size: 0.875rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .crud-table td,
//         .analytics-table td,
//         .files-table td {
//           color: var(--admin-text);
//           padding: 1rem;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//         }

//         .crud-table tr:last-child td,
//         .analytics-table tr:last-child td,
//         .files-table tr:last-child td {
//           border-bottom: none;
//         }

//         .crud-table tbody tr:hover,
//         .files-table tbody tr:hover {
//           background: rgba(99, 102, 241, 0.08);
//         }

//         /* ============================================
//            🎯 UNIFIED STATS & METRICS
//         ============================================ */
//         .stat-card,
//         .metric-card {
//           background: linear-gradient(135deg, var(--admin-bg-3) 0%, var(--admin-bg-4) 100%);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-md);
//           padding: 1.5rem;
//           display: flex;
//           gap: 1rem;
//           align-items: center;
//         }

//         .stat-icon,
//         .metric-icon {
//           width: 60px;
//           height: 60px;
//           border-radius: var(--admin-radius-md);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.75rem;
//           flex-shrink: 0;
//         }

//         .stat-value,
//         .metric-value {
//           color: var(--admin-text);
//           font-size: 1.75rem;
//           font-weight: 700;
//           line-height: 1;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label,
//         .metric-label {
//           color: var(--admin-text-muted);
//           font-size: 0.875rem;
//         }

//         /* ============================================
//            🔍 UNIFIED SEARCH & FILTERS
//         ============================================ */
//         .search-box,
//         .filters-bar,
//         .controls-bar,
//         .filters-section {
//           display: flex;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//           flex-wrap: wrap;
//           align-items: center;
//         }

//         .search-box {
//           flex: 1;
//           min-width: 250px;
//         }

//         .search-box input {
//           width: 100%;
//         }

//         /* ============================================
//            📄 UNIFIED PAGE HEADERS
//         ============================================ */
//         .page-header,
//         .crud-header {
//           margin-bottom: 2rem;
//         }

//         .page-header h2,
//         .crud-header h2 {
//           color: var(--admin-text);
//           font-size: 2rem;
//           margin: 0 0 0.5rem 0;
//           font-weight: 700;
//         }

//         .page-header p,
//         .crud-header p {
//           color: var(--admin-text-muted);
//           font-size: 1rem;
//           margin: 0;
//         }

//         /* ============================================
//            🎨 UNIFIED BADGES & TAGS
//         ============================================ */
//         .badge,
//         .status-badge,
//         .category-badge,
//         .level-badge {
//           display: inline-block;
//           padding: 0.375rem 0.875rem;
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .badge {
//           background: rgba(99, 102, 241, 0.2);
//           color: var(--admin-accent);
//         }

//         /* ============================================
//            ⚠️ UNIFIED ALERTS
//         ============================================ */
//         .alert {
//           padding: 1rem 1.5rem;
//           border-radius: var(--admin-radius-sm);
//           margin-bottom: 1.5rem;
//           font-weight: 500;
//           border-left: 4px solid;
//         }

//         .alert-success {
//           background: rgba(16, 185, 129, 0.15);
//           border-color: var(--admin-success);
//           color: var(--admin-success);
//         }

//         .alert-warning {
//           background: rgba(251, 191, 36, 0.15);
//           border-color: var(--admin-warning);
//           color: var(--admin-warning);
//         }

//         .alert-danger {
//           background: rgba(239, 68, 68, 0.15);
//           border-color: var(--admin-danger);
//           color: var(--admin-danger);
//         }

//         .alert-info {
//           background: rgba(59, 130, 246, 0.15);
//           border-color: var(--admin-info);
//           color: var(--admin-info);
//         }

//         /* ============================================
//            🎯 UNIFIED EMPTY STATES
//         ============================================ */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//           background: linear-gradient(135deg, var(--admin-bg-3) 0%, var(--admin-bg-4) 100%);
//           border: 1px solid var(--admin-border);
//           border-radius: var(--admin-radius-md);
//         }

//         .empty-icon {
//           font-size: 5rem;
//           margin-bottom: 1rem;
//           opacity: 0.5;
//         }

//         .empty-state p {
//           color: var(--admin-text-muted);
//           font-size: 1.125rem;
//           margin-bottom: 1.5rem;
//         }

//         /* ============================================
//            🔄 UNIFIED ANIMATIONS
//         ============================================ */
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.7;
//           }
//         }

//         .fade-in {
//           animation: fadeIn 0.3s ease;
//         }

//         /* ============================================
//            📱 UNIFIED RESPONSIVE
//         ============================================ */
//         @media (max-width: 768px) {
//           .page-header h2,
//           .crud-header h2 {
//             font-size: 1.5rem;
//           }

//           .stat-card,
//           .metric-card {
//             padding: 1rem;
//           }

//           .stat-icon,
//           .metric-icon {
//             width: 50px;
//             height: 50px;
//             font-size: 1.5rem;
//           }

//           .stat-value,
//           .metric-value {
//             font-size: 1.5rem;
//           }

//           .btn,
//           .action-btn,
//           .table-btn {
//             padding: 0.625rem 1rem;
//             font-size: 0.875rem;
//           }
//         }

//         /* ============================================
//            🎨 UTILITY CLASSES
//         ============================================ */
//         .muted {
//           color: var(--admin-text-muted);
//         }

//         .hidden {
//           display: none;
//         }

//         .text-center {
//           text-align: center;
//         }

//         .text-right {
//           text-align: right;
//         }

//         .mb-1 { margin-bottom: 0.5rem; }
//         .mb-2 { margin-bottom: 1rem; }
//         .mb-3 { margin-bottom: 1.5rem; }
//         .mb-4 { margin-bottom: 2rem; }

//         .mt-1 { margin-top: 0.5rem; }
//         .mt-2 { margin-top: 1rem; }
//         .mt-3 { margin-top: 1.5rem; }
//         .mt-4 { margin-top: 2rem; }

//         /* ============================================
//            🎨 STYLE GUIDE DEMO STYLES
//         ============================================ */
//         .style-guide {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem;
//           background: var(--admin-bg-1);
//           min-height: 100vh;
//         }

//         .style-guide h1 {
//           color: var(--admin-text);
//           margin-bottom: 2rem;
//           text-align: center;
//         }

//         .guide-section {
//           margin-bottom: 3rem;
//         }

//         .guide-section h2 {
//           color: var(--admin-accent);
//           margin-bottom: 1rem;
//           padding-bottom: 0.5rem;
//           border-bottom: 2px solid var(--admin-border);
//         }

//         .component-preview,
//         .card-preview,
//         .form-preview {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//           padding: 2rem;
//           background: var(--admin-bg-2);
//           border-radius: var(--admin-radius-md);
//         }

//         .admin-card {
//           flex: 1;
//           min-width: 250px;
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

function createActivity(type, message) {
  return {
    type,
    message,
    time: new Date().toLocaleString(),
  };
}

export default function UsersPage() {
  const [users, setUsers] = useLocalStorageArray("admin_users", []);
  const [activity, setActivity] = useLocalStorageArray("admin_activity", []);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
  });

  const resetForm = () => {
    setForm({ name: "", email: "", position: "" });
    setEditingId(null);
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId === null) {
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position.trim(),
      };
      const newArr = [newUser, ...users];
      setUsers(newArr);
      setActivity(prev => [
        createActivity("USER_CREATED", `Добавлен пользователь "${newUser.name}"`),
        ...prev,
      ]);
    } else {
      const newArr = users.map(u =>
        u.id === editingId
          ? {
              ...u,
              name: form.name.trim(),
              email: form.email.trim(),
              position: form.position.trim(),
            }
          : u
      );
      setUsers(newArr);
      const edited = newArr.find(u => u.id === editingId);
      setActivity(prev => [
        createActivity("USER_UPDATED", `Изменён пользователь "${edited.name}"`),
        ...prev,
      ]);
    }

    resetForm();
  };

  const onEdit = user => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      position: user.position || "",
    });
  };

  const onDelete = id => {
    const user = users.find(u => u.id === id);
    if (!window.confirm(`Удалить пользователя "${user?.name}"?`)) return;
    const newArr = users.filter(u => u.id !== id);
    setUsers(newArr);
    setActivity(prev => [
      createActivity("USER_DELETED", `Удалён пользователь "${user?.name}"`),
      ...prev,
    ]);
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h2>Users / Employees Management</h2>
        <p className="muted">Список сотрудников и базовая информация.</p>
      </div>

      <form className="crud-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label>Имя</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Имя сотрудника"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              type="email"
            />
          </div>
        </div>
        <div className="input-group">
          <label>Должность</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Специалист, менеджер..."
          />
        </div>
        <div className="crud-form__actions">
          <button className="btn btn--primary" type="submit">
            {editingId === null ? "Добавить" : "Сохранить"}
          </button>
          {editingId !== null && (
            <button
              className="btn btn--ghost"
              type="button"
              onClick={resetForm}
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Должность</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="muted">
                Нет пользователей. Добавьте первого.
              </td>
            </tr>
          )}
          {users.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.position}</td>
              <td>
                <button className="table-btn" onClick={() => onEdit(u)}>
                  Edit
                </button>
                <button
                  className="table-btn table-btn--danger"
                  onClick={() => onDelete(u.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

