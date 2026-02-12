import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// Components
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
// Pages
import HomePage from './pages/Home/HomePage';
import DetailsPage from './pages/Home/DetailsPage';
import SearchPage from './pages/Home/SearchPage';
import Watchlist from './pages/WatchlistPage';
import NotFound from './pages/NotFound';
import PersonPage from './pages/Home/ActorPage';
// Styles
import './Style/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-ily-dark text-white"> 
        <Header />
        <Toaster />
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:type/:slug" element={<DetailsPage />} />
            <Route path="/person/:slug" element={<PersonPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
