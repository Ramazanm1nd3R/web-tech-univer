import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../App";

export default function AdminLayout() {
  const { logout } = React.useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊", exact: true },
    { 
      group: "Управление", 
      items: [
        { path: "/admin/products", label: "Продукты", icon: "🛍️" },
        { path: "/admin/users", label: "Клиенты", icon: "👥" },
        { path: "/admin/orders", label: "Заказы", icon: "📦" },
      ]
    },
    { 
      group: "Финансы", 
      items: [
        { path: "/admin/transactions", label: "Транзакции", icon: "💳" },
        { path: "/admin/cards", label: "Карты", icon: "💎" },
        { path: "/admin/loans", label: "Кредиты", icon: "💰" },
      ]
    },
    { 
      group: "Аналитика", 
      items: [
        { path: "/admin/analytics", label: "Статистика", icon: "📈" },
        { path: "/admin/logs", label: "Логи", icon: "📜" },
      ]
    },
    { 
      group: "Система", 
      items: [
        { path: "/admin/notifications", label: "Уведомления", icon: "🔔", badge: notifications },
        { path: "/admin/security", label: "Безопасность", icon: "🔒" },
        { path: "/admin/files", label: "Файлы", icon: "📁" },
        { path: "/admin/settings", label: "Настройки", icon: "⚙️" },
        { path: "/admin/profile", label: "Профиль", icon: "👤" },
      ]
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    const allItems = menuItems.flatMap(item => 
      item.items ? item.items : [item]
    );
    const current = allItems.find(item => item.path === path);
    return current?.label || "Dashboard";
  };

  return (
    <div className="admin-app">
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__brand">
          <span className="brand-icon">🏦</span>
          {!collapsed && (
            <div>
              <div className="brand-name">RomaCredit</div>
              <div className="brand-subtitle">Admin Panel</div>
            </div>
          )}
        </div>

        <button 
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Развернуть" : "Свернуть"}
        >
          {collapsed ? '→' : '←'}
        </button>

        <nav className="sidebar__nav">
          {menuItems.map((item, idx) => {
            if (item.group) {
              return (
                <div key={idx} className="nav-group">
                  {!collapsed && <div className="nav-group__title">{item.group}</div>}
                  {item.items.map((subItem, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subItem.path}
                      end={subItem.exact}
                      className={({ isActive }) => 
                        `nav-link ${isActive ? 'nav-link--active' : ''}`
                      }
                      title={subItem.label}
                    >
                      <span className="nav-icon">{subItem.icon}</span>
                      {!collapsed && <span>{subItem.label}</span>}
                      {subItem.badge && !collapsed && (
                        <span className="nav-badge">{subItem.badge}</span>
                      )}
                    </NavLink>
                  ))}
                </div>
              );
            }
            return (
              <NavLink
                key={idx}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <button className="btn-logout" onClick={logout} title="Выйти">
            <span className="nav-icon">🚪</span>
            {!collapsed && <span>Выйти</span>}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header__left">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="breadcrumb">
              <span>Admin</span>
              <span className="breadcrumb-sep">/</span>
              <span>{getPageTitle()}</span>
            </div>
          </div>
          <div className="admin-header__right">
            <button className="header-btn" title="Уведомления">
              🔔
              {notifications > 0 && <span className="badge">{notifications}</span>}
            </button>
            <button className="header-btn" title="Поиск">
              🔍
            </button>
            <div className="header-user">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                alt="Admin" 
                className="header-avatar"
              />
              <div className="header-user-info">
                <div className="header-user-name">Администратор</div>
                <div className="header-user-role">Главный админ</div>
              </div>
            </div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>

      <style>{`
        .admin-app {
          display: flex;
          min-height: 100vh;
          background: #0a0e27;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1a1f3a 0%, #0f1729 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
        }

        .sidebar--collapsed {
          width: 80px;
        }

        .sidebar__brand {
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brand-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .brand-name {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sidebar__toggle {
          position: absolute;
          right: -12px;
          top: 90px;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: 2px solid #0a0e27;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }

        .sidebar__toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
        }

        .sidebar__nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1rem 0;
        }

        .sidebar__nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar__nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .nav-group {
          margin-bottom: 1.5rem;
        }

        .nav-group__title {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 0.5rem 1.5rem;
          margin-bottom: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
          transform: scaleY(0);
          transition: transform 0.2s;
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(99, 102, 241, 0.1);
        }

        .nav-link--active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
        }

        .nav-link--active::before {
          transform: scaleY(1);
        }

        .nav-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
          width: 24px;
          text-align: center;
        }

        .nav-badge {
          margin-left: auto;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .sidebar__footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
        }

        .admin-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar--collapsed + .admin-main {
          margin-left: 80px;
        }

        .admin-header {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .admin-header__left {
          flex: 1;
        }

        .page-title {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .breadcrumb {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .breadcrumb-sep {
          opacity: 0.5;
        }

        .admin-header__right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .header-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #fff;
        }

        .header-btn .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-user:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .header-user-info {
          display: flex;
          flex-direction: column;
        }

        .header-user-name {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .header-user-role {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .admin-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar--collapsed {
            transform: translateX(0);
          }

          .admin-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}