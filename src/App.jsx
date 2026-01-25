import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// Components
import Header from './pages/components/Header/Header';
import Footer from './pages/components/Footer/Footer';
// Pages
import HomePage from './pages/Home/HomePage';
import DetailsPage from './pages/Home/DetailsPage';
import SearchPage from './pages/Home/SearchPage';
import Watchlist from './pages/WatchlistPage';
// Styles
import './Style/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Toaster />
        <main className="main-content">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:type/:slug" element={<DetailsPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
