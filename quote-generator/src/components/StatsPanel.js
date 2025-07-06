import React from 'react';

const StatsPanel = ({ stats, favorites, history }) => {
  const favoriteCategories = Object.entries(stats.favoriteCategories || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const favoriteAuthors = Object.entries(stats.favoriteAuthors || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="stats-panel">
      <h3>Your Quote Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalQuotesViewed || 0}</div>
          <div className="stat-label">Quotes Viewed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{favorites.length}</div>
          <div className="stat-label">Favorites</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{history.length}</div>
          <div className="stat-label">Recent History</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.sessionsCount || 0}</div>
          <div className="stat-label">Sessions</div>
        </div>
      </div>

      {favoriteCategories.length > 0 && (
        <div className="stats-section">
          <h4>Top Categories</h4>
          <div className="stats-list">
            {favoriteCategories.map(([category, count]) => (
              <div key={category} className="stats-item">
                <span className="stats-name">{category}</span>
                <span className="stats-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {favoriteAuthors.length > 0 && (
        <div className="stats-section">
          <h4>Top Authors</h4>
          <div className="stats-list">
            {favoriteAuthors.map(([author, count]) => (
              <div key={author} className="stats-item">
                <span className="stats-name">{author}</span>
                <span className="stats-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
