// Utility functions for API handling

// Debounce function for search inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Check if we're online
export const isOnline = () => {
  return navigator.onLine;
};

// Handle API errors gracefully
export const handleApiError = (error, fallbackMessage = 'Something went wrong') => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your internet connection.';
  }
  
  if (error.message.includes('HTTP error')) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || fallbackMessage;
};

// Cache API responses (simple in-memory cache)
class ApiCache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    const expiresAt = Date.now() + this.ttl;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();

// Cached API request wrapper
export const cachedApiRequest = async (cacheKey, apiFunction, ...args) => {
  // Check cache first
  const cachedResult = apiCache.get(cacheKey);
  if (cachedResult) {
    console.log('Returning cached result for:', cacheKey);
    return cachedResult;
  }

  // Make API request
  try {
    const result = await apiFunction(...args);
    apiCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
