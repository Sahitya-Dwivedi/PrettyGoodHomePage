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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShortcutName, setNewShortcutName] = useState('');
  const [newShortcutUrl, setNewShortcutUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Background images
  const backgrounds = [
    "photo-1495571758719-6ec1e876d6ae.jpg",
    "photo-1506744038136-46273834b3fb.jpg",
  ];

  // Default shortcuts for first-time users
  const defaultShortcuts = [
    { name: "Google", url: "https://www.google.com", icon: "🔍" },
    { name: "Gmail", url: "https://mail.google.com", icon: "📧" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "📺" },
    { name: "Netflix", url: "https://www.netflix.com", icon: "🎬" },
  ];

  // Load shortcuts from Chrome storage or use defaults
  const [shortcuts, setShortcuts] = useState(defaultShortcuts);

  useEffect(() => {
    // Load shortcuts from Chrome storage
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["shortcuts"], (result) => {
      if (result.shortcuts) {
        setShortcuts(result.shortcuts);
      }
    });
  }, []);

  // Save shortcuts to Chrome storage when they change
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ shortcuts });
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

  // weather API call
  useEffect(() => {
    const city = "Ambala"; // Default city
    const BaseURL = "https://api.weatherapi.com/v1/current.json";
    const APIkey = import.meta.env.VITE_APP_WEATHER_API;
    const apiUrl = `${BaseURL}?key=${APIkey}&q=${encodeURIComponent(city)}`;
    (async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
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

  // quote call
  useEffect(() => {
    const quotes = [
      {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
      },
      {
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: "Albert Einstein",
      },
      { text: "So many books, so little time.", author: "Frank Zappa" },
      {
        text: "A room without books is like a body without a soul.",
        author: "Marcus Tullius Cicero",
      },
      {
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
      },
      {
        text: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain",
      },
      {
        text: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost",
      },
      {
        text: "No one can make you feel inferior without your consent.",
        author: "Eleanor Roosevelt",
      },
      {
        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi",
      },
      {
        text: "Without music, life would be a mistake.",
        author: "Friedrich Nietzsche",
      },
      {
        text: "We accept the love we think we deserve.",
        author: "Stephen Chbosky",
      },
      {
        text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson",
      },
      {
        text: "Here's to the crazy ones. The misfits. The rebels.",
        author: "Steve Jobs",
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "It is never too late to be what you might have been.",
        author: "George Eliot",
      },
      {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson",
      },
      {
        text: "Imagination is more important than knowledge.",
        author: "Albert Einstein",
      },
      {
        text: "Everything you’ve ever wanted is on the other side of fear.",
        author: "George Addair",
      },
      {
        text: "Don't cry because it's over, smile because it happened.",
        author: "Dr. Seuss",
      },
      {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky",
      },
      {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
      },
      {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay",
      },
      {
        text: "Whether you think you can or you think you can’t, you’re right.",
        author: "Henry Ford",
      },
      {
        text: "You must be the change you wish to see in the world.",
        author: "Mahatma Gandhi",
      },
      { text: "An unexamined life is not worth living.", author: "Socrates" },
      {
        text: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein",
      },
      {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
      },
      {
        text: "Act as if what you do makes a difference. It does.",
        author: "William James",
      },
    ];

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    let num = Math.floor(Math.random() * backgrounds.length);
    setBackgroundIndex(num);
  }, [backgrounds.length]);
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  // Show the add shortcut modal
  const addShortcut = () => {
    setShowAddModal(true);
  };

  // Handle the shortcut submission
  const handleAddShortcut = () => {
    setFormError('');
    
    // Validate inputs
    if (!newShortcutName.trim()) {
      setFormError('Please enter a name for the shortcut.');
      return;
    }
    
    if (!newShortcutUrl.trim()) {
      setFormError('Please enter a URL for the shortcut.');
      return;
    }
    
    // Process URL
    let url = newShortcutUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    
    try {
      // Test if URL is valid
      new URL(url);
      
      // Get favicon and add shortcut
      const favicon = getFaviconUrl(url);
      setShortcuts([...shortcuts, { name: newShortcutName.trim(), url, icon: favicon }]);
      
      // Clear form and close modal
      setNewShortcutName('');
      setNewShortcutUrl('');
      setShowAddModal(false);
    } catch {
      setFormError('Please enter a valid URL.');
    }
  };

  // Handle the shortcut edit submission
  const handleEditShortcut = () => {
    setFormError('');
    
    // Validate inputs
    if (!newShortcutName.trim()) {
      setFormError('Please enter a name for the shortcut.');
      return;
    }
    
    if (!newShortcutUrl.trim()) {
      setFormError('Please enter a URL for the shortcut.');
      return;
    }
    
    // Process URL
    let url = newShortcutUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    
    try {
      // Test if URL is valid
      new URL(url);
      
      // Get favicon and update shortcut
      const favicon = getFaviconUrl(url);
      const updatedShortcuts = [...shortcuts];
      updatedShortcuts[editIndex] = { name: newShortcutName.trim(), url, icon: favicon };
      setShortcuts(updatedShortcuts);
      
      // Clear form and close modal
      setNewShortcutName('');
      setNewShortcutUrl('');
      setShowAddModal(false);
      setIsEditMode(false);
      setEditIndex(null);
    } catch {
      setFormError('Please enter a valid URL.');
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

  // Add this function inside the App component
  const getFaviconUrl = (url) => {
    try {
      if (!url) return "🔗"; // Return a default icon if no URL is provided

      // Add protocol if missing
      let normalizedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        normalizedUrl = "https://" + url;
      }

      // Extract domain from URL
      const domain = new URL(normalizedUrl).hostname;

      // Use Google's favicon service instead of direct favicon URL
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (error) {
      console.error("Error parsing URL:", error);
      return "🔗"; // Return a default icon on error
    }
  };

  // Add this function with your other functions
  const editShortcut = (index) => {
    setIsEditMode(true);
    setEditIndex(index);
    setNewShortcutName(shortcuts[index].name);
    setNewShortcutUrl(shortcuts[index].url);
    setShowAddModal(true);
    setMenuOpenIndex(null);
  };

  return (
    <div className="app">
      <div
        className="background"
        style={{
          backgroundImage: `url(${backgrounds[backgroundIndex]})`,
        }}
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
                  <img src={shortcut.icon} className="icon" />
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
                    <button onClick={() => editShortcut(index)}>
                      Edit
                    </button>
                    <button onClick={() => deleteShortcut(index)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Shortcut Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{isEditMode ? "Edit Shortcut" : "Add New Shortcut"}</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                isEditMode ? handleEditShortcut() : handleAddShortcut();
              }}>
                {formError && <div className="form-error">{formError}</div>}
                
                <div className="form-group">
                  <label htmlFor="shortcut-name">Name</label>
                  <input
                    type="text"
                    id="shortcut-name"
                    value={newShortcutName}
                    onChange={(e) => setNewShortcutName(e.target.value)}
                    placeholder="e.g. GitHub"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="shortcut-url">URL</label>
                  <input
                    type="text"
                    id="shortcut-url"
                    value={newShortcutUrl}
                    onChange={(e) => setNewShortcutUrl(e.target.value)}
                    placeholder="e.g. github.com"
                    required
                  />
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => {
                      setShowAddModal(false);
                      setNewShortcutName('');
                      setNewShortcutUrl('');
                      setFormError('');
                      setIsEditMode(false);
                      setEditIndex(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    {isEditMode ? "Save Changes" : "Add Shortcut"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>{}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
