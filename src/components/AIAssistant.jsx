import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Здравствуйте! Я AI-помощник RomaCreditBank. Чем могу помочь?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addPoints } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: '💳', text: 'Оформить карту', action: 'cards' },
    { icon: '💰', text: 'Взять кредит', action: 'loan' },
    { icon: '📊', text: 'Открыть депозит', action: 'deposit' },
    { icon: '📞', text: 'Связаться с менеджером', action: 'contact' },
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Простой AI с предопределенными ответами
    if (msg.includes('карт') || msg.includes('card')) {
      return 'У нас есть 3 типа карт:\n\n💎 Premium Card - кешбэк 10%\n🥇 Gold Card - кешбэк 5%\n💳 Classic Card - кешбэк 1%\n\nКакая вас интересует?';
    }
    
    if (msg.includes('кредит') || msg.includes('займ')) {
      return 'Мы предлагаем следующие кредитные программы:\n\n🛍️ Потребительский - от 12.9%\n🚗 Автокредит - от 8.9%\n🏠 Ипотека - от 6.9%\n💼 Бизнес-кредит - от 14.9%\n\nЧто вас интересует?';
    }
    
    if (msg.includes('депозит') || msg.includes('вклад')) {
      return 'Наши депозитные программы:\n\n💰 Classic - до 14.5% годовых\n💎 Premium - до 16% годовых\n\nМинимальная сумма от 10,000 ₸';
    }
    
    if (msg.includes('курс') || msg.includes('валют')) {
      return 'Актуальные курсы валют:\n\n💵 USD: 450.50 ₸\n💶 EUR: 490.20 ₸\n💷 RUB: 5.10 ₸\n\nКурсы обновляются каждые 10 секунд.';
    }
    
    if (msg.includes('помощь') || msg.includes('help')) {
      return 'Я могу помочь вам с:\n\n📱 Выбором банковских продуктов\n💳 Оформлением карты\n💰 Расчетом кредита\n📊 Информацией о депозитах\n📞 Связью с менеджером\n\nПросто спросите меня!';
    }
    
    if (msg.includes('привет') || msg.includes('здравств')) {
      return 'Здравствуйте! 👋 Рад помочь вам. Что вас интересует?';
    }
    
    if (msg.includes('спасибо')) {
      return 'Всегда рад помочь! 😊 Есть ещё вопросы?';
    }
    
    return 'Интересный вопрос! Для более детальной консультации рекомендую связаться с нашим менеджером по телефону +7 (727) 123-45-67 или оставить заявку на сайте. Могу ли я ещё чем-то помочь?';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Добавляем очки за взаимодействие с чатом
    addPoints(5);

    // Симуляция задержки ответа
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(input),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch(action) {
      case 'cards':
        message = 'Расскажите о картах';
        break;
      case 'loan':
        message = 'Хочу взять кредит';
        break;
      case 'deposit':
        message = 'Интересует депозит';
        break;
      case 'contact':
        message = 'Как связаться с менеджером?';
        break;
    }
    setInput(message);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className="ai-chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
        {!isOpen && <span className="chat-pulse"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-avatar">🤖</div>
            <div className="ai-chat-info">
              <h3>AI Ассистент</h3>
              <p>Онлайн • Отвечает мгновенно</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="ai-chat-close">
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message message--${msg.type}`}>
                {msg.type === 'bot' && <div className="message-avatar">🤖</div>}
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {msg.timestamp.toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message message--bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-quick-actions">
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => handleQuickAction(action.action)}
                className="quick-action-btn"
              >
                {action.icon} {action.text}
              </button>
            ))}
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Напишите ваш вопрос..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        .ai-chat-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
          z-index: 1000;
          transition: all 0.3s;
        }

        .ai-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.6);
        }

        .chat-pulse {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          border: 3px solid #6366f1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .ai-chat-window {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 400px;
          height: 600px;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ai-chat-header {
          padding: 1.25rem;
          background: rgba(99, 102, 241, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ai-chat-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .ai-chat-info {
          flex: 1;
        }

        .ai-chat-info h3 {
          color: #fff;
          margin: 0;
          font-size: 1rem;
        }

        .ai-chat-info p {
          color: #10b981;
          margin: 0;
          font-size: 0.8rem;
        }

        .ai-chat-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
        }

        .ai-chat-close:hover {
          color: #fff;
        }

        .ai-chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .ai-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message--user {
          justify-content: flex-end;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .message-content {
          max-width: 70%;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          position: relative;
        }

        .message--bot .message-content {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .message--user .message-content {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .message-content p {
          color: #fff;
          margin: 0;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .message-time {
          display: block;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.5rem;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 1rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #6366f1;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .ai-chat-quick-actions {
          padding: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          background: rgba(0, 0, 0, 0.2);
        }

        .quick-action-btn {
          padding: 0.5rem 0.875rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          color: #fff;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .quick-action-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
        }

        .ai-chat-input {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .ai-chat-input input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          color: #fff;
          font-size: 0.95rem;
        }

        .ai-chat-input input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .ai-chat-input button {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ai-chat-input button:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .ai-chat-input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .ai-chat-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 140px);
            right: 20px;
            bottom: 80px;
          }
        }
      `}</style>
    </>
  );
}