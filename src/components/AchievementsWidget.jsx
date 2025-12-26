import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AchievementsWidget() {
  const { userAchievements, addPoints, addBadge } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const allBadges = [
    { id: 'first-login', name: 'Первый вход', icon: '🎯', description: 'Зарегистрировались в системе', requirement: 'Автоматически' },
    { id: 'card-master', name: 'Мастер карт', icon: '💳', description: 'Оформили первую карту', requirement: 'Оформить карту' },
    { id: 'investor', name: 'Инвестор', icon: '📈', description: 'Открыли инвестиционный портфель', requirement: 'Открыть портфель' },
    { id: 'chat-expert', name: 'Эксперт чата', icon: '💬', description: 'Задали 10 вопросов AI-ассистенту', requirement: '10 сообщений в чате' },
    { id: 'early-bird', name: 'Ранняя пташка', icon: '🌅', description: 'Заходили в систему в 6 утра', requirement: 'Зайти в 6:00' },
    { id: 'night-owl', name: 'Сова', icon: '🦉', description: 'Активны после полуночи', requirement: 'Быть онлайн после 00:00' },
    { id: 'vip-client', name: 'VIP клиент', icon: '👑', description: 'Достигли 5 уровня', requirement: '5000 очков' },
    { id: 'streak-master', name: 'Верный клиент', icon: '🔥', description: '7 дней подряд в системе', requirement: '7 дней streak' },
  ];

  const getNextLevel = () => {
    return (userAchievements.level * 1000);
  };

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (userAchievements.level - 1) * 1000;
    const nextLevelPoints = userAchievements.level * 1000;
    const progress = userAchievements.points - currentLevelPoints;
    const total = nextLevelPoints - currentLevelPoints;
    return (progress / total) * 100;
  };

  return (
    <>
      <button 
        className="achievements-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="level-badge">
          LVL {userAchievements.level}
        </span>
        <span className="points-badge">
          {userAchievements.points} XP
        </span>
      </button>

      {isOpen && (
        <div className="achievements-modal" onClick={() => setIsOpen(false)}>
          <div className="achievements-content" onClick={(e) => e.stopPropagation()}>
            <div className="achievements-header">
              <h2>🏆 Ваши достижения</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="level-section">
              <div className="level-info">
                <div className="level-avatar">
                  <span className="level-number">{userAchievements.level}</span>
                </div>
                <div className="level-details">
                  <h3>Уровень {userAchievements.level}</h3>
                  <p>{userAchievements.points} / {getNextLevel()} XP</p>
                </div>
              </div>
              
              <div className="level-progress">
                <div 
                  className="level-progress-fill"
                  style={{ width: `${getProgressToNextLevel()}%` }}
                ></div>
              </div>

              <div className="level-rewards">
                <div className="reward-item">
                  <span className="reward-icon">🎁</span>
                  <span>Следующая награда на уровне {userAchievements.level + 1}</span>
                </div>
              </div>
            </div>

            <div className="badges-section">
              <h3>Бейджи ({userAchievements.badges.length}/{allBadges.length})</h3>
              <div className="badges-grid">
                {allBadges.map(badge => {
                  const earned = userAchievements.badges.includes(badge.id);
                  return (
                    <div 
                      key={badge.id} 
                      className={`badge-card ${earned ? 'earned' : 'locked'}`}
                    >
                      <div className="badge-icon">{badge.icon}</div>
                      <div className="badge-info">
                        <h4>{badge.name}</h4>
                        <p>{badge.description}</p>
                        {!earned && (
                          <span className="badge-requirement">{badge.requirement}</span>
                        )}
                      </div>
                      {earned && <div className="badge-checkmark">✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="achievements-stats">
              <div className="stat-box">
                <span className="stat-value">{userAchievements.points}</span>
                <span className="stat-label">Всего очков</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{userAchievements.level}</span>
                <span className="stat-label">Уровень</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{userAchievements.badges.length}</span>
                <span className="stat-label">Бейджей</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{userAchievements.streak}</span>
                <span className="stat-label">Дней подряд</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .achievements-button {
          position: fixed;
          top: 100px;
          left: 20px;
          display: flex;
          gap: 0.5rem;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          z-index: 999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
        }

        .achievements-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .level-badge {
          background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .points-badge {
          color: #fff;
          padding: 0.25rem 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .achievements-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .achievements-content {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .achievements-content::-webkit-scrollbar {
          width: 8px;
        }

        .achievements-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .achievements-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .achievements-header h2 {
          color: #fff;
          margin: 0;
          font-size: 1.75rem;
        }

        .achievements-header button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.5rem;
          cursor: pointer;
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .achievements-header button:hover {
          color: #fff;
        }

        .level-section {
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .level-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .level-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
        }

        .level-number {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
        }

        .level-details h3 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .level-details p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 1rem;
        }

        .level-progress {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .level-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b 0%, #dc2626 100%);
          border-radius: 6px;
          transition: width 0.5s ease;
        }

        .level-rewards {
          display: flex;
          gap: 1rem;
        }

        .reward-item {
          padding: 0.75rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-size: 0.9rem;
        }

        .reward-icon {
          font-size: 1.5rem;
        }

        .badges-section {
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .badges-section h3 {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .badge-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          gap: 1rem;
          position: relative;
          transition: all 0.3s;
        }

        .badge-card.earned {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .badge-card.locked {
          opacity: 0.5;
        }

        .badge-card:hover {
          transform: translateY(-2px);
        }

        .badge-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .badge-info {
          flex: 1;
        }

        .badge-info h4 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }

        .badge-info p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
        }

        .badge-requirement {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 4px;
          color: #6366f1;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-checkmark {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 24px;
          height: 24px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .achievements-stats {
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .achievements-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .badges-grid {
            grid-template-columns: 1fr;
          }
        }

        .stat-box {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </>
  );
}