import { useState, useEffect , useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate('/');
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, navigate]);

  // Handle Submit
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
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
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