import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CurrencyTile() {
  const { currencyRates } = useApp();
  const [converterFrom, setConverterFrom] = useState('KZT');
  const [converterTo, setConverterTo] = useState('USD');
  const [amount, setAmount] = useState(1000);

  const currencies = {
    KZT: { name: 'Тенге', flag: '🇰🇿', rate: 1 },
    USD: { name: 'Доллар США', flag: '🇺🇸', rate: currencyRates.USD },
    EUR: { name: 'Евро', flag: '🇪🇺', rate: currencyRates.EUR },
    RUB: { name: 'Рубль', flag: '🇷🇺', rate: currencyRates.RUB },
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

  const getTrend = () => Math.random() > 0.5 ? 'up' : 'down';

  return (
    <div className="tile glass">
      <div className="tile-header">
        <h3 className="tile-title">💱 Курсы валют</h3>
      </div>

      <div className="currency-rates">
        {Object.entries(currencies).filter(([code]) => code !== 'KZT').map(([code, data]) => {
          const trend = getTrend();
          return (
            <div key={code} className="currency-rate-item">
              <span className="currency-flag">{data.flag}</span>
              <div className="currency-details">
                <span className="currency-code">{code}</span>
                <span className="currency-value">{data.rate.toFixed(2)} ₸</span>
              </div>
              <span className={`currency-trend ${trend}`}>
                {trend === 'up' ? '↗' : '↘'} {(Math.random() * 2).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="currency-converter">
        <h4 className="converter-title">Конвертер</h4>
        <div className="converter-inputs">
          <div className="converter-input-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Сумма"
            />
            <select value={converterFrom} onChange={(e) => setConverterFrom(e.target.value)}>
              {Object.entries(currencies).map(([code, data]) => (
                <option key={code} value={code}>{data.flag} {code}</option>
              ))}
            </select>
          </div>
          
          <button className="swap-btn" onClick={() => {
            setConverterFrom(converterTo);
            setConverterTo(converterFrom);
          }}>
            ⇄
          </button>

          <div className="converter-input-group">
            <input type="text" value={convert()} readOnly />
            <select value={converterTo} onChange={(e) => setConverterTo(e.target.value)}>
              {Object.entries(currencies).map(([code, data]) => (
                <option key={code} value={code}>{data.flag} {code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <style>{`
        .currency-rates {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .currency-rate-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .currency-flag {
          font-size: 1.5rem;
        }

        .currency-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .currency-code {
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .currency-value {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .currency-trend {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .currency-trend.up {
          color: #10b981;
        }

        .currency-trend.down {
          color: #ef4444;
        }

        .currency-converter {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .converter-title {
          color: #fff;
          font-size: 1rem;
          margin: 0 0 1rem 0;
        }

        .converter-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .converter-input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .converter-input-group input {
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #fff;
          font-size: 0.9rem;
        }

        .converter-input-group input:focus {
          outline: none;
          border-color: #6366f1;
        }

        .converter-input-group select {
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #fff;
          font-size: 0.875rem;
        }

        .swap-btn {
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          border-radius: 6px;
          color: #6366f1;
          width: 32px;
          height: 32px;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .swap-btn:hover {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}