import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ru';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [notifications, setNotifications] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({
    USD: 450.5,
    EUR: 490.2,
    RUB: 5.1,
  });

  const [userAchievements, setUserAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : {
      points: 0,
      level: 1,
      badges: [],
      streak: 0,
    };
  });

  // Сохранение темы
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Сохранение языка
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Сохранение пользователя
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Сохранение достижений
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
  }, [userAchievements]);

  // Симуляция обновления курсов валют
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrencyRates(prev => ({
        USD: prev.USD + (Math.random() - 0.5) * 2,
        EUR: prev.EUR + (Math.random() - 0.5) * 2,
        RUB: prev.RUB + (Math.random() - 0.5) * 0.1,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addPoints = (points) => {
    setUserAchievements(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      if (newLevel > prev.level) {
        addNotification({
          type: 'success',
          title: '🎉 Новый уровень!',
          message: `Поздравляем! Вы достигли ${newLevel} уровня!`
        });
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  const addBadge = (badge) => {
    setUserAchievements(prev => {
      if (prev.badges.includes(badge)) return prev;
      
      addNotification({
        type: 'success',
        title: '🏆 Новый бейдж!',
        message: `Вы получили бейдж: ${badge}`
      });

      return {
        ...prev,
        badges: [...prev.badges, badge],
      };
    });
  };

  const loginUser = (userData) => {
    setUser(userData);
    addPoints(10);
    addNotification({
      type: 'success',
      title: 'Добро пожаловать!',
      message: `Рады видеть вас, ${userData.name}!`
    });
  };

  const logoutUser = () => {
    setUser(null);
    addNotification({
      type: 'info',
      title: 'До встречи!',
      message: 'Вы успешно вышли из аккаунта'
    });
  };

  const value = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    user,
    loginUser,
    logoutUser,
    notifications,
    addNotification,
    removeNotification,
    currencyRates,
    userAchievements,
    addPoints,
    addBadge,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};