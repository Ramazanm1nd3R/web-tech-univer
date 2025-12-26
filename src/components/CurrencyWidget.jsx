import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CurrencyWidget() {
  const { currencyRates } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [converterFrom, setConverterFrom] = useState('KZT');
  const [converterTo, setConverterTo] = useState('USD');
  const [amount, setAmount] = useState(1000);

  const currencies = {
    KZT: { name: 'Тенге', flag: '🇰🇿', rate: 1 },
    USD: { name: 'Доллар США', flag: '🇺🇸', rate: currencyRates.USD },
    EUR: { name: 'Евро', flag: '🇪🇺', rate: currencyRates.EUR },
    RUB: { name: 'Российский рубль', flag: '🇷🇺', rate: currencyRates.RUB },
  };

  const convert = () => {
    const fromRate = currencies[converterFrom].rate;
    const toRate = currencies[converterTo].rate;
    
    if (converterFrom === 'KZT') {
      return (amount / toRate).toFixed(2);
    } else if (converterTo === 'KZT') {
      return (amount * fromRate).toFixed(2);
    } else {
      const inKzt = amount * fromRate;
      return (inKzt / toRate).toFixed(2);
    }
  };

  const getTrend = () => {
    // Симуляция тренда
    return Math.random() > 0.5 ? 'up' : 'down';
  };

  return (
    <>
      <div className="currency-widget">
        <div 
          className="currency-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3>💱 Курсы валют</h3>
          <button className="expand-btn">{isExpanded ? '▼' : '▲'}</button>
        </div>

        <div className="currency-list">
          {Object.entries(currencies).filter(([code]) => code !== 'KZT').map(([code, data]) => {
            const trend = getTrend();
            return (
              <div key={code} className="currency-item">
                <span className="currency-flag">{data.flag}</span>
                <div className="currency-info">
                  <span className="currency-code">{code}</span>
                  <span className="currency-name">{data.name}</span>
                </div>
                <div className="currency-rate">
                  <span className="rate-value">{data.rate.toFixed(2)} ₸</span>
                  <span className={`rate-trend ${trend}`}>
                    {trend === 'up' ? '↗' : '↘'} {(Math.random() * 2).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {isExpanded && (
          <div className="currency-converter">
            <h4>Конвертер валют</h4>
            
            <div className="converter-row">
              <div className="converter-input">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Сумма"
                />
                <select 
                  value={converterFrom}
                  onChange={(e) => setConverterFrom(e.target.value)}
                >
                  {Object.entries(currencies).map(([code, data]) => (
                    <option key={code} value={code}>
                      {data.flag} {code}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                className="swap-btn"
                onClick={() => {
                  setConverterFrom(converterTo);
                  setConverterTo(converterFrom);
                }}
              >
                ⇄
              </button>

              <div className="converter-input">
                <input
                  type="text"
                  value={convert()}
                  readOnly
                  placeholder="Результат"
                />
                <select 
                  value={converterTo}
                  onChange={(e) => setConverterTo(e.target.value)}
                >
                  {Object.entries(currencies).map(([code, data]) => (
                    <option key={code} value={code}>
                      {data.flag} {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="converter-info">
              <span>
                1 {converterFrom} = {
                  converterFrom === 'KZT' 
                    ? (1 / currencies[converterTo].rate).toFixed(4)
                    : converterTo === 'KZT'
                    ? currencies[converterFrom].rate.toFixed(4)
                    : (currencies[converterFrom].rate / currencies[converterTo].rate).toFixed(4)
                } {converterTo}
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .currency-widget {
          position: fixed;
          top: 100px;
          right: 20px;
          width: 350px;
          background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 998;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .currency-widget {
            left: 20px;
            right: 20px;
            width: auto;
          }
        }

        .currency-header {
          padding: 1.25rem;
          background: rgba(99, 102, 241, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .currency-header h3 {
          color: #fff;
          margin: 0;
          font-size: 1.125rem;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #6366f1;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.25rem;
          transition: transform 0.3s;
        }

        .currency-list {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .currency-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .currency-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .currency-flag {
          font-size: 1.75rem;
        }

        .currency-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .currency-code {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
        }

        .currency-name {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .currency-rate {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .rate-value {
          color: #fff;
          font-weight: 700;
          font-size: 1.125rem;
        }

        .rate-trend {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .rate-trend.up {
          color: #10b981;
        }

        .rate-trend.down {
          color: #ef4444;
        }

        .currency-converter {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .currency-converter h4 {
          color: #fff;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .converter-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .converter-input {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .converter-input input {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
        }

        .converter-input input:focus {
          outline: none;
          border-color: #6366f1;
        }

        .converter-input select {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .swap-btn {
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 8px;
          color: #6366f1;
          width: 40px;
          height: 40px;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .swap-btn:hover {
          background: rgba(99, 102, 241, 0.3);
          transform: rotate(180deg);
        }

        .converter-info {
          padding: 0.75rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 8px;
          text-align: center;
        }

        .converter-info span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
}