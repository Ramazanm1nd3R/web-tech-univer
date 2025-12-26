import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AchievementsTile() {
  const { userAchievements } = useApp();

  const getNextLevel = () => userAchievements.level * 1000;
  const getProgressToNextLevel = () => {
    const currentLevelPoints = (userAchievements.level - 1) * 1000;
    const nextLevelPoints = userAchievements.level * 1000;
    const progress = userAchievements.points - currentLevelPoints;
    const total = nextLevelPoints - currentLevelPoints;
    return (progress / total) * 100;
  };

  const badges = [
    { id: 'first-login', name: 'Первый вход', icon: '🎯' },
    { id: 'card-master', name: 'Мастер карт', icon: '💳' },
    { id: 'investor', name: 'Инвестор', icon: '📈' },
    { id: 'chat-expert', name: 'Чат эксперт', icon: '💬' },
  ];

  return (
    <div className="tile glass">
      <div className="tile-header">
        <h3 className="tile-title">🏆 Достижения</h3>
      </div>

      <div className="achievements-level">
        <div className="level-circle">
          <span className="level-number">{userAchievements.level}</span>
        </div>
        <div className="level-info">
          <h4>Уровень {userAchievements.level}</h4>
          <p>{userAchievements.points} / {getNextLevel()} XP</p>
        </div>
      </div>

      <div className="level-progress-bar">
        <div 
          className="level-progress-fill"
          style={{ width: `${getProgressToNextLevel()}%` }}
        ></div>
      </div>

      <div className="achievements-stats">
        <div className="stat-item">
          <span className="stat-value">{userAchievements.points}</span>
          <span className="stat-label">Очков</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userAchievements.badges.length}</span>
          <span className="stat-label">Бейджей</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userAchievements.streak}</span>
          <span className="stat-label">Дней</span>
        </div>
      </div>

      <div className="badges-preview">
        <h4 className="badges-title">Бейджи</h4>
        <div className="badges-grid">
          {badges.map(badge => {
            const earned = userAchievements.badges.includes(badge.id);
            return (
              <div key={badge.id} className={`badge-item ${earned ? 'earned' : 'locked'}`}>
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
                {earned && <span className="badge-check">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .achievements-level {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .level-circle {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .level-number {
          color: #fff;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .level-info h4 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1.125rem;
        }

        .level-info p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.875rem;
        }

        .level-progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .level-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b 0%, #dc2626 100%);
          transition: width 0.5s ease;
        }

        .achievements-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-item {
          text-align: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .stat-value {
          display: block;
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
        }

        .badges-preview {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .badges-title {
          color: #fff;
          font-size: 1rem;
          margin: 0 0 1rem 0;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 6px;
          position: relative;
        }

        .badge-item.earned {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .badge-item.locked {
          opacity: 0.4;
        }

        .badge-icon {
          font-size: 1.25rem;
        }

        .badge-name {
          color: #fff;
          font-size: 0.8rem;
          flex: 1;
        }

        .badge-check {
          color: #10b981;
          font-size: 0.875rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}