import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // States
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  // Background images
  const backgrounds = [
    'https://source.unsplash.com/random/1920x1080/?nature',
    'https://source.unsplash.com/random/1920x1080/?mountains',
    'https://source.unsplash.com/random/1920x1080/?ocean',
    'https://source.unsplash.com/random/1920x1080/?city',
    'https://source.unsplash.com/random/1920x1080/?abstract'
  ];

  const [bookmarks, setBookmarks] = useState([
    { name: 'Google', url: 'https://www.google.com', icon: '🔍' },
    { name: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺' },
    { name: 'GitHub', url: 'https://github.com', icon: '💻' },
    { name: 'Spotify', url: 'https://www.spotify.com', icon: '🎵' },
    { name: 'Netflix', url: 'https://www.netflix.com', icon: '🎬' }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate weather API call
  useEffect(() => {
    setTimeout(() => {
      setWeather({
        temp: '72°F',
        condition: 'Sunny',
        icon: '☀️'
      });
    }, 1000);
  }, []);

  // Simulate quote API call
  useEffect(() => {
    const quotes = [
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle background change
  const changeBackground = () => {
    setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
  };

  // Add new bookmark
  const addBookmark = () => {
    const name = prompt('Enter website name:');
    const url = prompt('Enter website URL:');
    if (name && url) {
      setBookmarks([...bookmarks, { name, url, icon: '🔖' }]);
    }
  };

  return (
    <div className="app">
      <div className="background" style={{backgroundImage: `url(${backgrounds[backgroundIndex]})`}}></div>
      <div className="overlay"></div>
      
      <div className="container">
        <header className="header">
          {weather && (
            <div className="weather">
              <span className="weather-icon">{weather.icon}</span>
              <div>
                <div className="weather-temp">{weather.temp}</div>
                <div>{weather.condition}</div>
              </div>
            </div>
          )}
          <button 
            className="add-button" 
            onClick={changeBackground}
            title="Change background">
            🖼️
          </button>
        </header>
        
        <h1 className="time">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
        <p className="date">{time.toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric'})}</p>
        
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
        
        <div className="bookmarks-container">
          <div className="bookmarks-header">
            <h2 className="bookmarks-title">Bookmarks</h2>
            <button className="add-button" onClick={addBookmark} title="Add bookmark">+</button>
          </div>
          <div className="bookmarks-grid">
            {bookmarks.map((bookmark, index) => (
              <a
                key={index}
                href={bookmark.url}
                className="bookmark"
              >
                <span className="icon">{bookmark.icon}</span>
                <span>{bookmark.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        {quote && (
          <div className="quote">
            <p>"{quote.text}"</p>
            <p>— {quote.author}</p>
          </div>
        )}
        
        <footer className="footer">
          <p>Your Beautiful Chrome Homepage • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;