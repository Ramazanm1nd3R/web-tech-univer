import React, { useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom"; // ✅

export default function LoginPage() {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate(); // ✅

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const res = login(form.username.trim(), form.password.trim());
    if (!res.ok) {
      setError(res.msg);
    } else {
      navigate("/admin", { replace: true }); // ✅ перенесли редирект сюда
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box glass">
        <h2>Admin Login</h2>
        <p className="muted">Demo: <b>admin / 123456</b></p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••"
            />
          </div>

          <button type="submit" className="btn btn--primary auth-submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
