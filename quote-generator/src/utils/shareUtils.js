// Utility functions for quote sharing and exporting
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (fallbackErr) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export const shareQuote = async (quote) => {
  const shareText = `"${quote.text}" — ${quote.author}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Inspirational Quote',
        text: shareText,
        url: window.location.href
      });
      return true;
    } catch (err) {
      console.log('Error sharing:', err);
      return false;
    }
  } else {
    // Fallback to copying to clipboard
    return await copyToClipboard(shareText);
  }
};

export const shareOnTwitter = (quote) => {
  const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank', 'width=600,height=400');
};

export const shareOnFacebook = (quote) => {
  const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`;
  window.open(url, '_blank', 'width=600,height=400');
};

export const shareOnLinkedIn = (quote) => {
  const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`;
  window.open(url, '_blank', 'width=600,height=400');
};

export const downloadQuoteAsImage = async (quote) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = 800;
  canvas.height = 600;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set text styles
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw quote text
  const maxWidth = canvas.width - 100;
  const words = quote.text.split(' ');
  const lines = [];
  let currentLine = '';
  
  ctx.font = '32px Arial, sans-serif';
  
  for (let word of words) {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());
  
  // Draw quote lines
  const lineHeight = 45;
  const startY = canvas.height / 2 - (lines.length * lineHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(`"${line}"`, canvas.width / 2, startY + index * lineHeight);
  });
  
  // Draw author
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText(`— ${quote.author}`, canvas.width / 2, startY + lines.length * lineHeight + 50);
  
  // Draw category
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText(`Category: ${quote.category}`, canvas.width / 2, canvas.height - 50);
  
  // Download the image
  try {
    const link = document.createElement('a');
    link.download = `quote-${quote.author.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
    return true;
  } catch (err) {
    console.error('Error downloading image:', err);
    return false;
  }
};

export const exportFavoritesToJSON = (favorites) => {
  const dataStr = JSON.stringify(favorites, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = 'favorite-quotes.json';
  link.click();
};

export const formatQuoteForSharing = (quote) => {
  return `"${quote.text}"\n\n— ${quote.author}\n\nCategory: ${quote.category}`;
};
