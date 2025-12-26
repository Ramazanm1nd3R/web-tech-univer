import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function QuestsTile() {
  const { addPoints } = useApp();
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const savedQuests = localStorage.getItem('daily_quests');
    const defaultQuests = [
      { id: 1, title: 'Утренний визит', icon: '🌅', progress: 0, target: 1, reward: 50, completed: false },
      { id: 2, title: 'Чат с AI', icon: '🤖', progress: 0, target: 5, reward: 100, completed: false },
      { id: 3, title: 'Конвертер валют', icon: '💱', progress: 0, target: 3, reward: 75, completed: false },
    ];

    if (savedQuests) {
      setQuests(JSON.parse(savedQuests));
    } else {
      setQuests(defaultQuests);
    }
  }, []);

  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="tile glass">
      <div className="tile-header">
        <h3 className="tile-title">📋 Ежедневные квесты</h3>
        <span className="quests-counter">{completedCount}/{quests.length}</span>
      </div>

      <div className="quests-list">
        {quests.map(quest => (
          <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
            <span className="quest-icon">{quest.icon}</span>
            <div className="quest-details">
              <h4>{quest.title}</h4>
              <div className="quest-progress">
                <div 
                  className="quest-progress-bar"
                  style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                ></div>
              </div>
              <span className="quest-status">{quest.progress}/{quest.target}</span>
            </div>
            <div className="quest-reward">
              +{quest.reward}
              <span>XP</span>
            </div>
            {quest.completed && <span className="quest-check">✓</span>}
          </div>
        ))}
      </div>

      <style>{`
        .quests-counter {
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 12px;
          padding: 0.25rem 0.75rem;
          color: #6366f1;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .quests-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quest-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          position: relative;
        }

        .quest-item.completed {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .quest-icon {
          font-size: 1.75rem;
        }

        .quest-details {
          flex: 1;
        }

        .quest-details h4 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }

        .quest-progress {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .quest-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          transition: width 0.3s ease;
        }

        .quest-item.completed .quest-progress-bar {
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
        }

        .quest-status {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
        }

        .quest-reward {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          background: rgba(245, 158, 11, 0.1);
          border-radius: 6px;
          color: #f59e0b;
          font-weight: 700;
          font-size: 1rem;
        }

        .quest-reward span {
          font-size: 0.7rem;
          opacity: 0.7;
        }

        .quest-check {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          color: #10b981;
          font-size: 1.25rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}