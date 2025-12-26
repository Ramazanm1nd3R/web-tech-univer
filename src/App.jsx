import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Public pages
import HomePage from "./pages/public/HomePage";
import ProductsPublicPage from "./pages/public/ProductsPublicPage";
import RegisterPage from "./pages/public/RegisterPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import CardsPage from "./pages/public/CardsPage";
import LoansPage from "./pages/public/LoansPage";
import InvestPage from "./pages/public/InvestPage";

// Admin pages
import AdminLayout from "./components/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import CardsManagementPage from "./pages/admin/CardsManagementPage";
import LoansManagementPage from "./pages/admin/LoansManagementPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import FilesPage from "./pages/admin/FilesPage";
import LogsPage from "./pages/admin/LogsPage";
import ProfilePage from "./pages/admin/ProfilePage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import SecurityPage from "./pages/admin/SecurityPage";

export const AuthContext = React.createContext(null);

const ADMIN = {
  username: "admin",
  password: "123456"
};

function ProtectedRoute({ children }) {
  const { isAuth } = React.useContext(AuthContext);
  return isAuth ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("admin_logged_in");
    if (saved === "true") {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (shouldNavigate && isAuth) {
      navigate("/admin", { replace: true });
      setShouldNavigate(false);
    }
  }, [isAuth, shouldNavigate, navigate]);

  const login = (username, password) => {
    if (username === ADMIN.username && password === ADMIN.password) {
      setIsAuth(true);
      localStorage.setItem("admin_logged_in", "true");
      setShouldNavigate(true);
      return { ok: true };
    }
    return { ok: false, msg: "Неверный логин или пароль" };
  };

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsAuth(false);
    navigate("/admin/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPublicPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="cards" element={<CardsManagementPage />} />
          <Route path="loans" element={<LoansManagementPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}