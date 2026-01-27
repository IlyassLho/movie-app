# 🎬 Ilyflicks - Premium Movie Discovery App

A modern, responsive movie discovery application built with **React** and **Redux Toolkit**. IlyFlicks allows users to browse trending content, search in real-time, watch trailers, and manage a persistent personal watchlist.

🚀 **Live Demo:** [Click here to visit IlyFlicks](https://ilyflicks.netlify.app/)

## ✨ Key Features

- **🛡️ State Management:** Robust data handling using **Redux Toolkit** (Slices, Store).
- **💾 Persistence:** Your "My List" is saved automatically using **LocalStorage** (data survives refresh).
- **🔍 Smart Search:** Real-time search with **Debounce** technique for performance optimization.
- **⚡ Performance:** Built with **Vite** for lightning-fast reloading and bundling.
- **📱 Responsive UI:** Fully optimized for Desktop, Tablet, and Mobile devices.
- **🔒 Security:** URL ID encoding/decoding to protect resource identifiers.
- **🎥 Multimedia:** Integrated video player for watching movie trailers/teasers.
- **🔔 Notifications:** User-friendly toast notifications for better UX.

## 🛠️ Tech Stack

- **Core:** React 19+, JavaScript (ES6+)
- **State Management:** Redux Toolkit, React-Redux
- **Routing:** React Router DOM v7
- **Data Fetching:** Axios
- **API:** The Movie Database (TMDB)
- **Styling:** Tailwind CSS 3.4+ (with custom theme), CSS3
- **Notifications:** React Hot Toast
- **Tooling:** Vite, ESLint, PostCSS, Autoprefixer

## 🚀 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IlyassLho/movie-app.git
   cd movie-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key (Important):**

   Create a file named `.env` in the root directory.

   Add your TMDB API key as follows:

   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_SALT=/?\
   ```

   > **Note:** You can get a free API key from [TMDB](https://www.themoviedb.org/settings/api)

4. **Start the development server:**

   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 to view it in the browser.

5. **Build for production:**

   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist` folder.

## 📂 Project Structure

```
src/
├── pages/
│   ├── components/      # Reusable UI components (Header, Footer, Row)
│   └── Home/            # Home-related pages
│       ├── HomePage.jsx      # Main landing page with trending content
│       ├── DetailsPage.jsx   # Movie/TV show details page
│       └── SearchPage.jsx    # Search results page
│   ├── WatchlistPage.jsx     # User's saved watchlist
│   └── NotFound.jsx          # 404 error page
├── redux/
│   ├── store.js              # Global Redux store configuration
│   └── watchlistSlice.js     # Watchlist state management slice
├── utils/
│   └── security.js           # ID encoding/decoding utilities
├── Style/
│   └── App.css               # Global styles and Tailwind imports
├── App.jsx                   # Main application component & Routing
└── main.jsx                  # Entry point & Redux Provider setup
```

## 🎨 Customization

The app uses Tailwind CSS with custom theme colors defined in `tailwind.config.js`:
- `ily-dark`: Primary dark background (#141414)
- `ily-blue`: Accent blue color (#36bdf2)
- `ily-purple`: Accent purple color (#6f42c1)

You can customize these colors by editing the `theme.extend.colors` section in `tailwind.config.js`.

## 🤝 Contributing

Contributions are always welcome! Feel free to fork the repository and submit a Pull Request.