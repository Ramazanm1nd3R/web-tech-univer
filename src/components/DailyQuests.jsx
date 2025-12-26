import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function DailyQuests() {
  const { addPoints, addBadge, addNotification } = useApp();
  const [quests, setQuests] = useState([]);
  const [showQuests, setShowQuests] = useState(false);

  useEffect(() => {
    // Генерация ежедневных квестов
    const dailyQuests = [
      {
        id: 1,
        title: 'Утренний визит',
        description: 'Зайдите в систему до 10:00',
        reward: 50,
        type: 'daily',
        icon: '🌅',
        progress: 0,
        target: 1,
        completed: false,
      },
      {
        id: 2,
        title: 'Поговорите с AI',
        description: 'Задайте 5 вопросов AI-ассистенту',
        reward: 100,
        type: 'daily',
        icon: '🤖',
        progress: 0,
        target: 5,
        completed: false,
      },
      {
        id: 3,
        title: 'Конвертер валют',
        description: 'Воспользуйтесь конвертером 3 раза',
        reward: 75,
        type: 'daily',
        icon: '💱',
        progress: 0,
        target: 3,
        completed: false,
      },
      {
        id: 4,
        title: 'Исследователь',
        description: 'Посетите все разделы сайта',
        reward: 150,
        type: 'daily',
        icon: '🗺️',
        progress: 0,
        target: 7,
        completed: false,
      },
      {
        id: 5,
        title: 'Социальная сеть',
        description: 'Поделитесь продуктом в соц. сетях',
        reward: 200,
        type: 'weekly',
        icon: '📱',
        progress: 0,
        target: 1,
        completed: false,
      },
    ];

    const saved = localStorage.getItem('daily_quests');
    if (saved) {
      const parsed = JSON.parse(saved);
      const lastReset = localStorage.getItem('quests_reset_date');
      const today = new Date().toDateString();
      
      if (lastReset !== today) {
        // Сброс ежедневных квестов
        const reset = parsed.map(q => 
          q.type === 'daily' 
            ? { ...q, progress: 0, completed: false }
            : q
        );
        setQuests(reset);
        localStorage.setItem('quests_reset_date', today);
      } else {
        setQuests(parsed);
      }
    } else {
      setQuests(dailyQuests);
      localStorage.setItem('quests_reset_date', new Date().toDateString());
    }
  }, []);

  useEffect(() => {
    if (quests.length > 0) {
      localStorage.setItem('daily_quests', JSON.stringify(quests));
    }
  }, [quests]);

  const updateQuestProgress = (questId, increment = 1) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId && !quest.completed) {
        const newProgress = Math.min(quest.progress + increment, quest.target);
        const isCompleted = newProgress >= quest.target;
        
        if (isCompleted && !quest.completed) {
          addPoints(quest.reward);
          addNotification({
            type: 'success',
            title: '🎉 Квест выполнен!',
            message: `${quest.title} - получено ${quest.reward} XP`
          });

          if (questId === 2) addBadge('chat-expert');
        }

        return {
          ...quest,
          progress: newProgress,
          completed: isCompleted,
        };
      }
      return quest;
    }));
  };

  // Функция для тестирования (можно вызвать из консоли)
  window.completeQuest = updateQuestProgress;

  const completedCount = quests.filter(q => q.completed).length;
  const totalRewards = quests.reduce((sum, q) => sum + (q.completed ? q.reward : 0), 0);

  return (
    <>
      <button 
        className="quests-button"
        onClick={() => setShowQuests(!showQuests)}
      >
        <span className="quests-icon">📋</span>
        <span className="quests-badge">{completedCount}/{quests.length}</span>
      </button>

      {showQuests && (
        <div className="quests-modal" onClick={() => setShowQuests(false)}>
          <div className="quests-content" onClick={(e) => e.stopPropagation()}>
            <div className="quests-header">
              <h2>📋 Ежедневные задания</h2>
              <button onClick={() => setShowQuests(false)}>✕</button>
            </div>

            <div className="quests-stats">
              <div className="quest-stat">
                <span className="stat-icon">✅</span>
                <div>
                  <span className="stat-value">{completedCount}/{quests.length}</span>
                  <span className="stat-label">Выполнено</span>
                </div>
              </div>
              <div className="quest-stat">
                <span className="stat-icon">⭐</span>
                <div>
                  <span className="stat-value">{totalRewards} XP</span>
                  <span className="stat-label">Получено</span>
                </div>
              </div>
            </div>

            <div className="quests-list">
              {quests.map(quest => (
                <div 
                  key={quest.id} 
                  className={`quest-card ${quest.completed ? 'completed' : ''}`}
                >
                  <div className="quest-icon">{quest.icon}</div>
                  <div className="quest-info">
                    <div className="quest-header-info">
                      <h4>{quest.title}</h4>
                      {quest.type === 'weekly' && (
                        <span className="quest-type">Недельное</span>
                      )}
                    </div>
                    <p>{quest.description}</p>
                    
                    <div className="quest-progress-section">
                      <div className="quest-progress-bar">
                        <div 
                          className="quest-progress-fill"
                          style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                        ></div>
                      </div>
                      <span className="quest-progress-text">
                        {quest.progress}/{quest.target}
                      </span>
                    </div>
                  </div>
                  <div className="quest-reward">
                    <span className="reward-value">+{quest.reward}</span>
                    <span className="reward-label">XP</span>
                  </div>
                  {quest.completed && (
                    <div className="quest-checkmark">✓</div>
                  )}
                </div>
              ))}
            </div>

            <div className="quests-footer">
              <p className="reset-info">
                ⏰ Обновление через: {getTimeUntilReset()}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .quests-button {
          position: fixed;
          bottom: 180px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
          z-index: 1000;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .quests-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(245, 158, 11, 0.6);
        }

        .quests-icon {
          font-size: 28px;
        }

        .quests-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #10b981;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          border: 2px solid #1a1f3a;
        }

        .quests-modal {
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

        .quests-content {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        .quests-content::-webkit-scrollbar {
          width: 8px;
        }

        .quests-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .quests-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quests-header h2 {
          color: #fff;
          margin: 0;
          font-size: 1.75rem;
        }

        .quests-header button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.5rem;
          cursor: pointer;
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .quests-header button:hover {
          color: #fff;
        }

        .quests-stats {
          padding: 1.5rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quest-stat {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-value {
          display: block;
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .quests-list {
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quest-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          position: relative;
          transition: all 0.3s;
        }

        .quest-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.05);
        }

        .quest-card.completed {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .quest-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .quest-info {
          flex: 1;
        }

        .quest-header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .quest-info h4 {
          color: #fff;
          margin: 0;
          font-size: 1.125rem;
        }

        .quest-type {
          padding: 0.25rem 0.75rem;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid #f59e0b;
          border-radius: 12px;
          color: #f59e0b;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .quest-info p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
        }

        .quest-progress-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .quest-progress-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .quest-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b 0%, #dc2626 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .quest-card.completed .quest-progress-fill {
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
        }

        .quest-progress-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .quest-reward {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
          flex-shrink: 0;
        }

        .quest-card.completed .quest-reward {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .reward-value {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1;
        }

        .reward-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
        }

        .quest-checkmark {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
        }

        .quests-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .reset-info {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .quests-button {
            bottom: 170px;
            right: 20px;
          }

          .quests-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

function getTimeUntilReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}ч ${minutes}мин`;
}