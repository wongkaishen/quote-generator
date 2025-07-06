import React, { useState, useEffect } from 'react';
import QuoteService from '../services/quoteService';
import { handleApiError } from '../utils/apiUtils';
import { exportFavoritesToJSON } from '../utils/shareUtils';
import { useFavorites, useQuoteHistory, useTheme, useStats, useKeyboardShortcuts } from '../hooks/useQuoteHooks';
import QuoteActions from './QuoteActions';
import FavoritesPanel from './FavoritesPanel';
import StatsPanel from './StatsPanel';
import Toast from './Toast';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [multipleQuotes, setMultipleQuotes] = useState([]);
  const [showMultiple, setShowMultiple] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // generator, favorites, stats
  const [toasts, setToasts] = useState([]);

  // Custom hooks
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { history, addToHistory, clearHistory } = useQuoteHistory();
  const { theme, toggleTheme } = useTheme();
  const { stats, updateStats } = useStats();

  // Toast management
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Load a random quote on component mount
  useEffect(() => {
    loadRandomQuote();
  }, []);

  // Update stats and history when quote changes
  useEffect(() => {
    if (currentQuote) {
      updateStats(currentQuote);
      addToHistory(currentQuote);
    }
  }, [currentQuote, updateStats, addToHistory]);

  // Load random quote function
  const loadRandomQuote = async () => {
    setLoading(true);
    setError(null);
    setShowMultiple(false);
    
    try {
      const quote = await QuoteService.getRandomInspirationalQuote();
      setCurrentQuote(quote);
      showToast('New quote loaded!', 'success');
    } catch (err) {
      setError(handleApiError(err));
      showToast('Failed to load quote', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);
    setShowMultiple(false);

    try {
      const quotes = await QuoteService.getCategoryQuotes(category);
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
        showToast(`Loaded ${category} quote!`, 'success');
      } else {
        const quote = await QuoteService.getRandomInspirationalQuote();
        setCurrentQuote(quote);
        showToast(`No quotes found for ${category}, showing random quote`, 'info');
      }
    } catch (err) {
      setError(handleApiError(err));
      showToast('Failed to load category quotes', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load multiple quotes
  const loadMultipleQuotes = async () => {
    setLoading(true);
    setError(null);
    setShowMultiple(true);

    try {
      const quotes = await QuoteService.getMultipleRandomQuotes(5);
      setMultipleQuotes(quotes);
      showToast('Multiple quotes loaded!', 'success');
    } catch (err) {
      setError(handleApiError(err));
      showToast('Failed to load multiple quotes', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Select a quote from multiple quotes
  const selectQuote = (quote) => {
    setCurrentQuote(quote);
    setShowMultiple(false);
    showToast('Quote selected!', 'success');
  };

  // Toggle favorite
  const toggleFavorite = () => {
    if (!currentQuote) return;
    
    if (isFavorite(currentQuote.id)) {
      removeFromFavorites(currentQuote.id);
      showToast('Removed from favorites', 'info');
    } else {
      addToFavorites(currentQuote);
      showToast('Added to favorites!', 'success');
    }
  };

  // Export favorites
  const handleExportFavorites = () => {
    exportFavoritesToJSON(favorites);
    showToast('Favorites exported!', 'success');
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onRandomQuote: loadRandomQuote,
    onToggleFavorite: toggleFavorite,
    onToggleTheme: toggleTheme,
    onCopy: () => {
      if (currentQuote) {
        navigator.clipboard?.writeText(`"${currentQuote.text}" — ${currentQuote.author}`);
        showToast('Quote copied!', 'success');
      }
    }
  });

  const popularCategories = QuoteService.getPopularCategories();

  return (
    <div className="quote-generator">
      {/* Header */}
      <div className="quote-header">
        <h1>Enhanced Quote Generator</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title="Toggle theme (T)"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          Quote Generator
        </button>
        <button 
          className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites ({favorites.length})
        </button>
        <button 
          className={`nav-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      {/* Generator Tab */}
      {activeTab === 'generator' && (
        <>
          {/* Main Quote Display */}
          <div className="quote-display">
            {loading && <div className="loading">Loading inspirational quotes...</div>}
            {error && <div className="error">{error}</div>}
            {currentQuote && !loading && !showMultiple && (
              <div className="quote-card">
                <blockquote>"{currentQuote.text}"</blockquote>
                <cite>— {currentQuote.author}</cite>
                <div className="quote-meta">
                  <span className="category">Category: {currentQuote.category}</span>
                  <span className="length">Length: {currentQuote.length} chars</span>
                </div>
                <QuoteActions 
                  quote={currentQuote}
                  isFavorite={isFavorite(currentQuote.id)}
                  onToggleFavorite={toggleFavorite}
                  onShowToast={showToast}
                />
              </div>
            )}
          </div>

          {/* Multiple Quotes Display */}
          {showMultiple && multipleQuotes.length > 0 && (
            <div className="multiple-quotes">
              <h3>Choose a Quote:</h3>
              {multipleQuotes.map((quote, index) => (
                <div
                  key={quote.id}
                  className="quote-option"
                  onClick={() => selectQuote(quote)}
                >
                  <p>"{quote.text}"</p>
                  <small>— {quote.author} ({quote.category})</small>
                </div>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="controls">
            <button onClick={loadRandomQuote} disabled={loading} title="Get random quote (R)">
              🎲 Random Quote
            </button>
            <button onClick={loadMultipleQuotes} disabled={loading}>
              📝 Multiple Quotes
            </button>
          </div>

          {/* Popular Categories */}
          <div className="categories">
            <h3>Browse by Popular Categories:</h3>
            <div className="category-buttons">
              {popularCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={selectedCategory === category ? 'active' : ''}
                  disabled={loading}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* All Categories */}
          <div className="all-categories">
            <details>
              <summary>All Available Categories ({QuoteService.getAvailableCategories().length})</summary>
              <div className="category-grid">
                {QuoteService.getAvailableCategories().map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    disabled={loading}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </details>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="shortcuts-help">
            <h4>⌨️ Keyboard Shortcuts:</h4>
            <div className="shortcuts-list">
              <div className="shortcut-item">
                <span>Random Quote</span>
                <span className="shortcut-key">R</span>
              </div>
              <div className="shortcut-item">
                <span>Toggle Favorite</span>
                <span className="shortcut-key">F</span>
              </div>
              <div className="shortcut-item">
                <span>Copy Quote</span>
                <span className="shortcut-key">C</span>
              </div>
              <div className="shortcut-item">
                <span>Toggle Theme</span>
                <span className="shortcut-key">T</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <FavoritesPanel 
          favorites={favorites}
          onSelectQuote={(quote) => {
            setCurrentQuote(quote);
            setActiveTab('generator');
            showToast('Quote loaded from favorites!', 'success');
          }}
          onRemoveFromFavorites={(id) => {
            removeFromFavorites(id);
            showToast('Removed from favorites', 'info');
          }}
          onExportFavorites={handleExportFavorites}
        />
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <StatsPanel 
          stats={stats}
          favorites={favorites}
          history={history}
        />
      )}

      {/* API Info */}
      <div className="api-info">
        <small>
          🚀 Powered by API Ninjas • 
          {selectedCategory && ` Currently showing: ${selectedCategory} • `}
          {currentQuote && ` Current: ${currentQuote.author}`}
        </small>
      </div>

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default QuoteGenerator;
