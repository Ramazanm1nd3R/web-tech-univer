import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function NotificationsToast() {
  const { notifications, removeNotification } = useApp();

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <Notification 
          key={notification.id} 
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      <style>{`
        .notifications-container {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .notifications-container {
            left: 20px;
            right: 20px;
          }
        }
      `}</style>
    </div>
  );
}

function Notification({ notification, onClose }) {
  const [progress, setProgress] = React.useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#6366f1';
      default: return '#6b7280';
    }
  };

  return (
    <div className="notification-toast" style={{ pointerEvents: 'auto' }}>
      <div className="toast-icon" style={{ background: getColor(notification.type) }}>
        {getIcon(notification.type)}
      </div>
      <div className="toast-content">
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>✕</button>
      <div className="toast-progress" style={{ 
        width: `${progress}%`,
        background: getColor(notification.type)
      }}></div>

      <style>{`
        .notification-toast {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          min-width: 300px;
          max-width: 400px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          display: flex;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .toast-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .toast-content {
          flex: 1;
        }

        .toast-content h4 {
          color: #fff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .toast-content p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .toast-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .toast-close:hover {
          color: #fff;
        }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          transition: width 0.1s linear;
        }
      `}</style>
    </div>
  );
}