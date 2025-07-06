# 🌟 Enhanced Quote Generator

A beautiful, feature-rich React application that delivers inspirational quotes with a modern user experience. Built with the API Ninjas service, this quote generator goes beyond simple quote display to offer a complete quote management and sharing platform.

![Quote Generator Demo](https://img.shields.io/badge/React-19+-blue.svg)
![API](https://img.shields.io/badge/API-API%20Ninjas-green.svg)
![Theme](https://img.shields.io/badge/Theme-Light%20%7C%20Dark-purple.svg)
![Status](https://img.shields.io/badge/Status-Enhanced-success.svg)

## ✨ Features

### 🎯 Core Quote Functionality
- **Random Quotes**: Get inspiring quotes from 50+ categories
- **Category Browsing**: Filter quotes by specific themes (love, success, motivation, etc.)
- **Multiple Quote Selection**: Load 5 random quotes and choose your favorite
- **Smart API Integration**: Primary API with intelligent fallback system

### ❤️ Favorites System
- **Save Favorites**: Heart button to save quotes you love
- **Smart Search**: Search through your favorite quotes by text, author, or category
- **Flexible Sorting**: Sort by date added, author, category, or quote length
- **Export Feature**: Download your favorites as a JSON file

### 🎨 Theme & Personalization
- **Dark/Light Mode**: Beautiful themes with smooth transitions
- **Persistent Preferences**: Remembers your theme choice
- **Modern Design**: Clean, responsive interface with CSS variables
- **Smooth Animations**: Polished user experience with subtle effects

### 📊 Analytics & Insights
- **Usage Statistics**: Track quotes viewed, favorites count, and session history
- **Top Categories**: See your most-viewed quote categories
- **Favorite Authors**: Discover your preferred quote authors
- **Session Tracking**: Monitor your app usage over time

### 🚀 Sharing & Export
- **Copy to Clipboard**: One-click quote copying
- **Social Media Sharing**: Direct sharing to Twitter, Facebook, and LinkedIn
- **Image Downloads**: Generate and download quote images
- **Multiple Export Formats**: Save favorites in various formats

### ⌨️ Enhanced User Experience
- **Keyboard Shortcuts**: 
  - `R` - Random quote
  - `F` - Toggle favorite
  - `C` - Copy quote
  - `T` - Toggle theme
- **Toast Notifications**: Real-time feedback for all actions
- **Quote History**: Track your last 50 viewed quotes
- **Responsive Design**: Perfect on desktop, tablet, and mobile

## 🛠️ Technology Stack

- **Frontend**: React 19+ with Hooks
- **Styling**: Custom CSS with CSS Variables (Dark/Light theme support)
- **API**: API Ninjas Quotes API (50+ categories)
- **Storage**: LocalStorage for persistence
- **Architecture**: Component-based with custom hooks

## 📦 Project Structure

```
src/
├── api/
│   ├── config.js          # API configuration with environment variables
│   ├── quotes.js          # API calls and endpoints
│   └── index.js           # API exports
├── components/
│   ├── QuoteGenerator.js  # Main application component
│   ├── QuoteActions.js    # Quote action buttons (favorite, share, etc.)
│   ├── FavoritesPanel.js  # Favorites management interface
│   ├── StatsPanel.js      # Statistics dashboard
│   ├── Toast.js           # Notification system
│   └── QuoteGenerator.css # Comprehensive styling
├── hooks/
│   └── useQuoteHooks.js   # Custom React hooks for state management
├── services/
│   └── quoteService.js    # Business logic layer
└── utils/
    ├── apiUtils.js        # API utility functions
    └── shareUtils.js      # Sharing and export utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- API Ninjas API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wongkaishen/quote-generator.git
   cd quote-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API (Optional)**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_NINJAS_BASE_URL=https://api.api-ninjas.com/v1
   REACT_APP_API_NINJAS_KEY=your-api-key-here
   ```
   *Note: The app includes fallback values for immediate testing*

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How to Use

### Basic Usage
1. **Get Quotes**: Click "Random Quote" or select a category
2. **Save Favorites**: Click the heart ❤️ button on quotes you love
3. **Switch Themes**: Use the theme toggle button (🌙/☀️)
4. **Share Quotes**: Use the action buttons below each quote

### Advanced Features
- **Multiple Quotes**: Load 5 quotes at once and choose your favorite
- **Keyboard Navigation**: Use shortcuts (R, F, C, T) for quick actions
- **Search Favorites**: Find specific quotes in your collection
- **Export Data**: Download your favorites or quote images
- **View Statistics**: Check your usage patterns and preferences

## 🎯 Available Quote Categories

The app supports 50+ categories including:
- **Popular**: Inspirational, Motivational, Success, Happiness, Life, Love
- **Emotions**: Courage, Fear, Anger, Jealousy, Hope
- **Life Areas**: Business, Education, Health, Family, Friendship
- **Values**: Freedom, Equality, Justice, Wisdom, Truth
- **And many more...**

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_NINJAS_BASE_URL`: API base URL
- `REACT_APP_API_NINJAS_KEY`: Your API key

### Local Storage
The app stores:
- User favorites
- Quote viewing history
- Theme preferences
- Usage statistics

## 🎨 Customization

### Themes
The app uses CSS variables for easy theme customization:
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --button-bg: #667eea;
  /* ... more variables */
}
```

### Adding Features
The modular architecture makes it easy to add:
- New quote sources
- Additional sharing platforms
- Custom quote categories
- Enhanced analytics

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **API Ninjas** for providing the comprehensive quotes API
- **React Community** for the excellent ecosystem
- **Open Source Contributors** for inspiration and tools

---

**Built with ❤️ using React and API Ninjas**

*Transform your day with inspiring quotes - beautifully presented, easily shared, and personally curated.*
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

To launch the test runner:
```bash
npm test
```

### Building for Production

To build the app for production:
```bash
npm run build
```
The optimized build will be in the `build` folder.

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)

## License

This project is licensed under the MIT License.
