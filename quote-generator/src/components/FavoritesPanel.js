import React, { useState } from 'react';

const FavoritesPanel = ({ favorites, onSelectQuote, onRemoveFromFavorites, onExportFavorites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, author, category, length

  const filteredFavorites = favorites.filter(quote =>
    quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return (b.favoritedAt || 0) - (a.favoritedAt || 0);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (favorites.length === 0) {
    return (
      <div className="favorites-panel">
        <h3>Your Favorites</h3>
        <div className="empty-state">
          <p>No favorite quotes yet!</p>
          <p>Click the heart button on any quote to add it to your favorites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-panel">
      <div className="favorites-header">
        <h3>Your Favorites ({favorites.length})</h3>
        <button 
          className="export-btn"
          onClick={onExportFavorites}
          title="Export favorites as JSON"
        >
          📥 Export
        </button>
      </div>

      <div className="favorites-controls">
        <input
          type="text"
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="recent">Recently Added</option>
          <option value="author">By Author</option>
          <option value="category">By Category</option>
          <option value="length">By Length</option>
        </select>
      </div>

      <div className="favorites-list">
        {sortedFavorites.map(quote => (
          <div key={quote.id} className="favorite-item">
            <div className="favorite-content" onClick={() => onSelectQuote(quote)}>
              <blockquote>"{quote.text}"</blockquote>
              <cite>— {quote.author}</cite>
              <div className="favorite-meta">
                <span className="category">{quote.category}</span>
                <span className="date">
                  {quote.favoritedAt ? new Date(quote.favoritedAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFromFavorites(quote.id);
              }}
              title="Remove from favorites"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPanel;
