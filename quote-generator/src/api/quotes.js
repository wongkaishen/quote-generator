import API_CONFIG from './config';

// Utility function to handle API requests
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Function to get a random quote from API Ninjas
export const getRandomQuote = async () => {
  try {
    const url = `${API_CONFIG.API_NINJAS_BASE_URL}/quotes`;
    const response = await apiRequest(url);
    
    // API Ninjas returns an array, so we take the first quote
    if (Array.isArray(response) && response.length > 0) {
      return response[0];
    }
    
    throw new Error('No quotes returned from API');
  } catch (error) {
    console.error('Failed to fetch random quote:', error);
    throw new Error('Failed to fetch random quote');
  }
};

// Function to get quotes by category from API Ninjas
export const getQuotesByCategory = async (category) => {
  try {
    const url = `${API_CONFIG.API_NINJAS_BASE_URL}/quotes?category=${encodeURIComponent(category)}`;
    const response = await apiRequest(url);
    
    if (Array.isArray(response)) {
      return response;
    }
    
    return [];
  } catch (error) {
    console.error(`Failed to fetch quotes by category ${category}:`, error);
    throw new Error(`Failed to fetch quotes by category: ${category}`);
  }
};

// Function to get multiple random quotes (API Ninjas doesn't have author search, so we'll get random quotes)
export const getMultipleQuotes = async (limit = 5) => {
  try {
    const quotes = [];
    
    // API Ninjas returns one quote per request, so we make multiple requests
    for (let i = 0; i < limit; i++) {
      const quote = await getRandomQuote();
      quotes.push(quote);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return quotes;
  } catch (error) {
    console.error('Failed to fetch multiple quotes:', error);
    throw new Error('Failed to fetch multiple quotes');
  }
};

// Fallback function using Quotable API if API Ninjas fails
export const getFallbackQuote = async () => {
  try {
    const url = `${API_CONFIG.QUOTABLE_API}/random`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Convert Quotable format to API Ninjas format
    return {
      quote: data.content,
      author: data.author,
      category: data.tags?.[0] || 'general'
    };
  } catch (error) {
    console.error('Fallback API also failed:', error);
    throw new Error('All quote APIs are unavailable');
  }
};
