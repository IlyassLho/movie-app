import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Header from './pages/components/Header/Header';
import Footer from './pages/components/Footer/Footer';
// Pages
import HomePage from './pages/Home/HomePage';
import DetailsPage from './pages/Home/DetailsPage';
import SearchPage from './pages/Home/SearchPage';
// Styles
import './Style/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:type/:slug" element={<DetailsPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
