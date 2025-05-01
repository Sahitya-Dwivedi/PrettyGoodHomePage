# Pretty Good Homepage

A beautiful custom Chrome new tab page that replaces your default new tab with a personalized dashboard featuring time, weather, search, and customizable shortcuts.

## Features

- **Dynamic Background Images** - Beautiful backgrounds that rotate automatically
- **Date and Time Display** - Clean, minimal time and date information
- **Weather Information** - Current temperature and conditions for your location
- **Inspirational Quotes** - Random quotes that change each time you open a new tab
- **Google Search Integration** - Search Google directly from your new tab
- **Customizable Shortcuts** - Add, edit, and delete website shortcuts with favicons
- **Persistent Settings** - Your shortcuts are saved between browser sessions

## Installation

### Manual Installation
1. Clone this repository
   ```
   git clone https://github.com/yourusername/PrettyGoodHomePage.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your weather API key
   ```
   VITE_APP_WEATHER_API=your_weather_api_key_here
   ```
4. Build the extension
   ```
   npm run build
   ```
5. Open Chrome and navigate to `chrome://extensions/`
6. Enable "Developer mode" in the top-right corner
7. Click "Load unpacked" and select the `dist` folder from this project
8. Open a new tab to see your custom homepage

## Development

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/PrettyGoodHomePage.git
   cd PrettyGoodHomePage
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. For extension testing, build the project and load it as an unpacked extension
   ```
   npm run build
   ```

## Building for Production

```
npm run build
```

The built extension will be in the `dist` folder, ready to be loaded into Chrome.

## Technical Details

- Built with React
- Uses Vite for fast development and building
- Styled with CSS
- Weather data from [Weather API](https://www.weatherapi.com/)

## Customization

### Adding More Backgrounds
Add your image files to the `public` folder and update the backgrounds array in the code.

### Changing the Weather Location
By default, the weather shows for Ambala (the default location). To change this location:

1. Open `src/App.jsx`
2. Look for line 76 where the default city is defined:
   ```jsx
   const city = "Ambala"; // Default city
   ```
3. Replace "Ambala" with your preferred city name
4. Save the file and rebuild the extension

Note that the location should be a valid city name recognized by the Weather API.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- Background images from [Unsplash](https://unsplash.com/)
- Inspiration from various new tab extensions
- Complete README documentation generated with the assistance of GitHub Copilot, including project structure, installation instructions, and feature documentation
- Powered by Claude 3.7 Sonnet, an Anthropic AI model for code generation and project assistance

---

*Made with ❤️ by Sahitya Dwivedi*
