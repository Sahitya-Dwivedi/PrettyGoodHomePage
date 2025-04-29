import React, { useState, useEffect } from "react";
import "./App.css";
import { IoAddSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function App() {
  // States
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  // Background images
  const backgrounds = [
    "https://source.unsplash.com/random/1920x1080/?nature",
    "https://source.unsplash.com/random/1920x1080/?mountains",
    "https://source.unsplash.com/random/1920x1080/?ocean",
    "https://source.unsplash.com/random/1920x1080/?city",
    "https://source.unsplash.com/random/1920x1080/?abstract",
  ];

  // Default shortcuts for first-time users
  const defaultShortcuts = [
    { name: "Google", url: "https://www.google.com", icon: "🔍" },
    { name: "Gmail", url: "https://mail.google.com", icon: "📧" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "📺" },
    { name: "Netflix", url: "https://www.netflix.com", icon: "🎬" },
  ];

  // Load shortcuts from localStorage or use defaults
  const [shortcuts, setShortcuts] = useState(() => {
    const savedShortcuts = localStorage.getItem("shortcuts");
    return savedShortcuts ? JSON.parse(savedShortcuts) : defaultShortcuts;
  });

  // Save shortcuts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpenIndex(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Simulate weather API call
  useEffect(() => {
    const city = "Ambala"; // Default city
    const BaseURL = "https://api.weatherapi.com/v1/current.json";
    const APIkey = import.meta.env.VITE_APP_WEATHER_API;
    const apiUrl = `${BaseURL}?key=${APIkey}&q=${encodeURIComponent(city)}`;
    (async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          setWeather({
            temp: `${Math.round(data.current.temp_c)}°C`,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
              ? `https:${data.current.condition.icon}`
              : "❓",
          });
        }, 1000);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({
          temp: "N/A",
          condition: "Unable to fetch weather",
          icon: "❓",
        });
      }
    })();
  }, []);

  // Simulate quote API call
  useEffect(() => {
    const quotes = [
      {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay",
      },
      {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  // Handle background change
  const changeBackground = () => {
    setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
  };

  // Add new shortcut
  const addShortcut = () => {
    const name = prompt("Enter website name:");
    const url = prompt("Enter website URL:");
    if (name && url) {
      setShortcuts([...shortcuts, { name, url, icon: "🔖" }]);
    }
  };

  // Delete a shortcut
  const deleteShortcut = (index) => {
    if (window.confirm(`Delete shortcut "${shortcuts[index].name}"?`)) {
      const updatedShortcuts = [...shortcuts];
      updatedShortcuts.splice(index, 1);
      setShortcuts(updatedShortcuts);
    }
    setMenuOpenIndex(null);
  };

  // Toggle menu for a shortcut
  const toggleMenu = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <div className="app">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
      ></div>
      <div className="overlay"></div>

      <div className="container">
        <header className="header">
          <div className="time-date-container">
            <h1 className="time">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h1>
            <p className="date">
              {time.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {quote && (
            <div className="quote header-quote">
              <p>"{quote.text}"</p>
              <p>— {quote.author}</p>
            </div>
          )}

          {weather && (
            <div className="weather">
              <img src={weather.icon} className="weather-icon" alt="icon" />
              <div>
                <div className="weather-temp">{weather.temp}</div>
                <div>{weather.condition}</div>
              </div>
            </div>
          )}
          <button
            className="add-button"
            onClick={changeBackground}
            title="Change background"
          >
            🖼️
          </button>
        </header>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        <div className="bookmarks-container">
          <div className="bookmarks-header">
            <h2 className="bookmarks-title">Shortcuts</h2>
            <div className="bookmarks-actions">
              <button
                className="action-button"
                onClick={addShortcut}
                title="Add shortcut"
              >
                <IoAddSharp size={20} />
              </button>
            </div>
          </div>
          <div className="bookmarks-grid">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="bookmark-wrapper">
                <a href={shortcut.url} className="bookmark">
                  <span className="icon">{shortcut.icon}</span>
                  <span>{shortcut.name}</span>
                </a>

                <button
                  className="menu-button"
                  onClick={(e) => toggleMenu(index, e)}
                >
                  <BsThreeDotsVertical />
                </button>

                {menuOpenIndex === index && (
                  <div className="shortcut-menu">
                    <button onClick={() => deleteShortcut(index)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="footer">
          <p>Your Beautiful Chrome Homepage • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
