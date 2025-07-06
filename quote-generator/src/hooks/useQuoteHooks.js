// Custom hooks for quote generator functionality
import { useState, useEffect, useCallback } from 'react';

// Hook for managing favorites
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('quote-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = useCallback((quote) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === quote.id);
      if (isAlreadyFavorite) return prev;
      
      const newFavorites = [...prev, { ...quote, favoritedAt: Date.now() }];
      localStorage.setItem('quote-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((quoteId) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.id !== quoteId);
      localStorage.setItem('quote-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((quoteId) => {
    return favorites.some(fav => fav.id === quoteId);
  }, [favorites]);

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};

// Hook for managing quote history
export const useQuoteHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quote-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = useCallback((quote) => {
    setHistory(prev => {
      const newHistory = [
        { ...quote, viewedAt: Date.now() },
        ...prev.filter(item => item.id !== quote.id)
      ].slice(0, 50); // Keep only last 50 quotes
      
      localStorage.setItem('quote-history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('quote-history');
  }, []);

  return { history, addToHistory, clearHistory };
};

// Hook for theme management
export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('quote-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('quote-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme };
};

// Hook for statistics
export const useStats = () => {
  const [stats, setStats] = useState({
    totalQuotesViewed: 0,
    favoriteCategories: {},
    favoriteAuthors: {},
    sessionsCount: 0
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('quote-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    
    // Increment session count
    setStats(prev => {
      const newStats = { ...prev, sessionsCount: prev.sessionsCount + 1 };
      localStorage.setItem('quote-stats', JSON.stringify(newStats));
      return newStats;
    });
  }, []);

  const updateStats = useCallback((quote) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        totalQuotesViewed: prev.totalQuotesViewed + 1,
        favoriteCategories: {
          ...prev.favoriteCategories,
          [quote.category]: (prev.favoriteCategories[quote.category] || 0) + 1
        },
        favoriteAuthors: {
          ...prev.favoriteAuthors,
          [quote.author]: (prev.favoriteAuthors[quote.author] || 0) + 1
        }
      };
      localStorage.setItem('quote-stats', JSON.stringify(newStats));
      return newStats;
    });
  }, []);

  return { stats, updateStats };
};

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = (callbacks) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore if user is typing in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'r':
          if (callbacks.onRandomQuote) callbacks.onRandomQuote();
          break;
        case 'f':
          if (callbacks.onToggleFavorite) callbacks.onToggleFavorite();
          break;
        case 'c':
          if (callbacks.onCopy) callbacks.onCopy();
          break;
        case 's':
          if (callbacks.onShare) callbacks.onShare();
          break;
        case 't':
          if (callbacks.onToggleTheme) callbacks.onToggleTheme();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [callbacks]);
};
