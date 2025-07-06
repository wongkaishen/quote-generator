import { getRandomQuote, getQuotesByCategory, getMultipleQuotes, getFallbackQuote } from '../api';

// Service layer for quote-related business logic
class QuoteService {
  // Get a random inspirational quote
  static async getRandomInspirationalQuote() {
    try {
      const quote = await getRandomQuote();
      return this.formatQuote(quote);
    } catch (error) {
      console.error('Error fetching random quote:', error);
      
      // Try fallback API
      try {
        const fallbackQuote = await getFallbackQuote();
        return this.formatQuote(fallbackQuote);
      } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError);
        return this.getHardcodedFallbackQuote();
      }
    }
  }

  // Get quotes by specific category
  static async getCategoryQuotes(category) {
    try {
      const quotes = await getQuotesByCategory(category);
      return quotes.map(quote => this.formatQuote(quote));
    } catch (error) {
      console.error(`Error fetching quotes for category ${category}:`, error);
      return [];
    }
  }

  // Get multiple random quotes
  static async getMultipleRandomQuotes(limit = 5) {
    try {
      const quotes = await getMultipleQuotes(limit);
      return quotes.map(quote => this.formatQuote(quote));
    } catch (error) {
      console.error('Error fetching multiple quotes:', error);
      return [];
    }
  }

  // Format quote data consistently (API Ninjas format)
  static formatQuote(quote) {
    return {
      id: `${quote.author}-${Date.now()}-${Math.random()}`,
      text: quote.quote,
      author: quote.author,
      category: quote.category || 'general',
      length: quote.quote?.length || 0
    };
  }

  // Hardcoded fallback quote when all APIs fail
  static getHardcodedFallbackQuote() {
    return {
      id: 'fallback',
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: 'inspirational',
      length: 48
    };
  }

  // Get available quote categories for API Ninjas
  static getAvailableCategories() {
    return [
      'age',
      'alone', 
      'amazing',
      'anger',
      'architecture',
      'art',
      'attitude',
      'beauty',
      'best',
      'birthday',
      'business',
      'car',
      'change',
      'communication',
      'computers',
      'cool',
      'courage',
      'dad',
      'dating',
      'death',
      'design',
      'dreams',
      'education',
      'environmental',
      'equality',
      'experience',
      'failure',
      'faith',
      'family',
      'famous',
      'fear',
      'fitness',
      'food',
      'forgiveness',
      'freedom',
      'friendship',
      'funny',
      'future',
      'god',
      'good',
      'government',
      'graduation',
      'great',
      'happiness',
      'health',
      'history',
      'home',
      'hope',
      'humor',
      'imagination',
      'inspirational',
      'intelligence',
      'jealousy',
      'knowledge',
      'leadership',
      'learning',
      'legal',
      'life',
      'love',
      'marriage',
      'medical',
      'men',
      'mom',
      'money',
      'morning',
      'movies',
      'success'
    ];
  }

  // Get popular/featured categories
  static getPopularCategories() {
    return [
      'inspirational',
      'motivational',
      'success',
      'happiness',
      'life',
      'love',
      'friendship',
      'wisdom'
    ];
  }
}

export default QuoteService;
