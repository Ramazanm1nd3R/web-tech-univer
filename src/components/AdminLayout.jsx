import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

export default function AdminLayout() {
  const { logout } = React.useContext(AuthContext);

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="sidebar__brand">RomaAdmin</div>

        <nav className="sidebar__nav">
          <NavLink end to="/admin">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
        </nav>

        <button className="btn btn--ghost sidebar__logout" onClick={logout}>
          Выйти
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-main__header">
          <h1>Admin Dashboard</h1>
          <p>Панель управления сайтом</p>
        </header>

        <section className="admin-main__content glass">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
