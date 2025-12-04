import React, { useState } from "react";
import useLocalStorageArray from "../../hooks/useLocalStorageArray";

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("admin_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Администратор",
          email: "admin@turanbank.kz",
          phone: "+7 777 123 4567",
          position: "Главный администратор",
          avatar: "👨‍💼",
          bio: "Управление системой TuranBank",
          timezone: "Asia/Almaty",
          language: "ru",
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
        };
  });

  const [activity] = useLocalStorageArray("admin_activity", []);
  const [editing, setEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("admin_profile", JSON.stringify(profile));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert("Пароли не совпадают!");
      return;
    }
    if (passwordForm.new.length < 6) {
      alert("Пароль должен быть минимум 6 символов!");
      return;
    }
    alert("Пароль успешно изменен!");
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const recentActivity = activity.slice(0, 10);

  const sessions = [
    {
      id: 1,
      device: "Chrome на Windows",
      location: "Almaty, Kazakhstan",
      ip: "85.159.xxx.xxx",
      lastActive: new Date(Date.now() - 300000),
      current: true,
    },
    {
      id: 2,
      device: "Safari на MacOS",
      location: "Astana, Kazakhstan",
      ip: "195.210.xxx.xxx",
      lastActive: new Date(Date.now() - 86400000),
      current: false,
    },
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>👤 Мой профиль</h2>
        <p className="muted">Управление личными данными и настройками</p>
      </div>

      {saved && (
        <div className="alert alert-success">
          ✓ Профиль успешно обновлен!
        </div>
      )}

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-large">{profile.avatar}</div>
              {editing && (
                <div className="avatar-options">
                  {["👨‍💼", "👩‍💼", "🧑‍💻", "👨‍🎓", "🦸", "🤵"].map((emoji) => (
                    <button
                      key={emoji}
                      className="avatar-btn"
                      onClick={() =>
                        setProfile({ ...profile, avatar: emoji })
                      }
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-info">
              {!editing ? (
                <>
                  <h3>{profile.name}</h3>
                  <p className="position">{profile.position}</p>
                  <p className="bio">{profile.bio}</p>
                </>
              ) : (
                <div className="edit-form">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="Имя"
                  />
                  <input
                    type="text"
                    value={profile.position}
                    onChange={(e) =>
                      setProfile({ ...profile, position: e.target.value })
                    }
                    placeholder="Должность"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    placeholder="О себе"
                    rows={3}
                  />
                </div>
              )}

              <div className="profile-stats">
                <div className="stat">
                  <div className="stat-value">{activity.length}</div>
                  <div className="stat-label">Действий</div>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    {Math.floor(Math.random() * 100) + 50}
                  </div>
                  <div className="stat-label">Дней онлайн</div>
                </div>
              </div>

              <div className="profile-actions">
                {!editing ? (
                  <button
                    className="btn btn--primary btn--full"
                    onClick={() => setEditing(true)}
                  >
                    ✏️ Редактировать
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn--primary btn--full"
                      onClick={handleSave}
                    >
                      💾 Сохранить
                    </button>
                    <button
                      className="btn btn--ghost btn--full"
                      onClick={() => setEditing(false)}
                    >
                      ✕ Отмена
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="section-card">
            <h3>📧 Контактная информация</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                {!editing ? (
                  <div className="info-value">{profile.email}</div>
                ) : (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                )}
              </div>

              <div className="info-item">
                <label>Телефон</label>
                {!editing ? (
                  <div className="info-value">{profile.phone}</div>
                ) : (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                )}
              </div>

              <div className="info-item">
                <label>Часовой пояс</label>
                {!editing ? (
                  <div className="info-value">{profile.timezone}</div>
                ) : (
                  <select
                    value={profile.timezone}
                    onChange={(e) =>
                      setProfile({ ...profile, timezone: e.target.value })
                    }
                  >
                    <option value="Asia/Almaty">Asia/Almaty (GMT+6)</option>
                    <option value="Europe/Moscow">Europe/Moscow (GMT+3)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                  </select>
                )}
              </div>

              <div className="info-item">
                <label>Язык</label>
                {!editing ? (
                  <div className="info-value">
                    {profile.language === "ru" ? "Русский" : "English"}
                  </div>
                ) : (
                  <select
                    value={profile.language}
                    onChange={(e) =>
                      setProfile({ ...profile, language: e.target.value })
                    }
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="kk">Қазақша</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3>🔒 Безопасность</h3>
            <form className="password-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Текущий пароль</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, current: e.target.value })
                  }
                  placeholder="••••••"
                />
              </div>

              <div className="form-group">
                <label>Новый пароль</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                  placeholder="••••••"
                />
              </div>

              <div className="form-group">
                <label>Подтвердите пароль</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirm: e.target.value })
                  }
                  placeholder="••••••"
                />
              </div>

              <button type="submit" className="btn btn--primary">
                🔐 Изменить пароль
              </button>
            </form>
          </div>

          <div className="section-card">
            <h3>💻 Активные сессии</h3>
            <div className="sessions-list">
              {sessions.map((session) => (
                <div key={session.id} className="session-item">
                  <div className="session-icon">
                    {session.current ? "🟢" : "⚪"}
                  </div>
                  <div className="session-info">
                    <div className="session-device">{session.device}</div>
                    <div className="session-details">
                      {session.location} • {session.ip}
                    </div>
                    <div className="session-time">
                      {session.current
                        ? "Текущая сессия"
                        : `${Math.floor((Date.now() - session.lastActive) / 3600000)} ч. назад`}
                    </div>
                  </div>
                  {!session.current && (
                    <button className="btn btn--ghost btn--sm">
                      Завершить
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <h3>📊 Недавняя активность</h3>
            <div className="activity-list">
              {recentActivity.length === 0 && (
                <p className="muted">Активность отсутствует</p>
              )}
              {recentActivity.map((act, idx) => (
                <div key={idx} className="activity-entry">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <div className="activity-type">{act.type}</div>
                    <div className="activity-message">{act.message}</div>
                    <div className="activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page {
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

        .alert {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #10b981;
        }

        .profile-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }
        }

        .profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .profile-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }

        .avatar-section {
          margin-bottom: 1.5rem;
        }

        .avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          margin: 0 auto 1rem;
        }

        .avatar-options {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .avatar-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .avatar-btn:hover {
          background: rgba(99, 102, 241, 0.3);
          border-color: #6366f1;
        }

        .profile-info h3 {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
        }

        .position {
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .bio {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .edit-form input,
        .edit-form textarea {
          padding: 0.75rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .profile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .profile-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
        }

        .section-card h3 {
          color: #fff;
          font-size: 1.25rem;
          margin: 0 0 1.5rem 0;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-item label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .info-value {
          color: #fff;
          font-size: 1rem;
        }

        .info-item input,
        .info-item select {
          padding: 0.75rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
        }

        .password-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .form-group input {
          padding: 0.875rem 1rem;
          background: rgba(10, 14, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
        }

        .sessions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .session-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .session-icon {
          font-size: 1.5rem;
        }

        .session-info {
          flex: 1;
        }

        .session-device {
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .session-details {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .session-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-entry {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .activity-icon {
          font-size: 1.5rem;
        }

        .activity-content {
          flex: 1;
        }

        .activity-type {
          color: #6366f1;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .activity-message {
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .activity-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .btn--sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}