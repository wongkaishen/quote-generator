import React from 'react';
import { shareOnTwitter, shareOnFacebook, shareOnLinkedIn, copyToClipboard, downloadQuoteAsImage } from '../utils/shareUtils';

const QuoteActions = ({ quote, isFavorite, onToggleFavorite, onShowToast }) => {
  const handleCopy = async () => {
    const text = `"${quote.text}" — ${quote.author}`;
    const success = await copyToClipboard(text);
    onShowToast(success ? 'Quote copied to clipboard!' : 'Failed to copy quote', success ? 'success' : 'error');
  };

  const handleDownload = async () => {
    const success = await downloadQuoteAsImage(quote);
    onShowToast(success ? 'Quote image downloaded!' : 'Failed to download image', success ? 'success' : 'error');
  };

  const handleSocialShare = (platform) => {
    switch (platform) {
      case 'twitter':
        shareOnTwitter(quote);
        break;
      case 'facebook':
        shareOnFacebook(quote);
        break;
      case 'linkedin':
        shareOnLinkedIn(quote);
        break;
      default:
        break;
    }
    onShowToast('Opening share dialog...', 'info');
  };

  return (
    <div className="quote-actions">
      <button
        className={`action-btn favorite ${isFavorite ? 'active' : ''}`}
        onClick={onToggleFavorite}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <span className="icon">{isFavorite ? '❤️' : '🤍'}</span>
        <span className="label">{isFavorite ? 'Favorited' : 'Favorite'}</span>
      </button>

      <button
        className="action-btn copy"
        onClick={handleCopy}
        title="Copy quote to clipboard"
      >
        <span className="icon">📋</span>
        <span className="label">Copy</span>
      </button>

      <button
        className="action-btn download"
        onClick={handleDownload}
        title="Download as image"
      >
        <span className="icon">💾</span>
        <span className="label">Download</span>
      </button>

      <div className="share-group">
        <span className="share-label">Share:</span>
        <button
          className="action-btn share twitter"
          onClick={() => handleSocialShare('twitter')}
          title="Share on Twitter"
        >
          <span className="icon">🐦</span>
        </button>
        <button
          className="action-btn share facebook"
          onClick={() => handleSocialShare('facebook')}
          title="Share on Facebook"
        >
          <span className="icon">📘</span>
        </button>
        <button
          className="action-btn share linkedin"
          onClick={() => handleSocialShare('linkedin')}
          title="Share on LinkedIn"
        >
          <span className="icon">💼</span>
        </button>
      </div>
    </div>
  );
};

export default QuoteActions;
