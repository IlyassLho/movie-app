import { useState, useEffect , useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        if (location.pathname === '/search') {
          navigate('/');
        }
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); 

  // Clear Search on Navigation Away from Search Page
  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setSearchQuery('');
    }
  }, [location.pathname]);


  // Handle Submit (Enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);

      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link 
          to="/" 
          onClick={() => setSearchQuery('')}
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
        >
          🎬 Ily<span>Flicks</span>
        </Link>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;