import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      // if search query is not empty, navigate to search page
      if (searchQuery.trim() !== '') {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        if (location.pathname === '/search') {
          navigate('/');
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Clear Search on Navigation Away from Search Page
  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

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
    <header className="bg-gray-800 text-white p-4 px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 shadow-lg relative z-[100] pt-4 md:pt-4">
      {/* Logo - Centered on mobile, left on desktop */}
      <div className="text-2xl md:text-3xl font-bold flex items-center order-1 md:order-none mx-auto md:mx-0">
        <Link
          to="/"
          onClick={() => setSearchQuery('')}
          className="no-underline text-inherit flex items-center"
        >
          🎬 Ily<span className="bg-clip-text text-transparent bg-ily-gradient ml-1">Flicks</span>
        </Link>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-2.5 items-center order-2 md:order-none w-[90vw] md:w-auto justify-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2 px-3 border border-gray-600 rounded-full bg-gray-700 text-gray-300 w-full md:w-[350px] transition-all duration-300 ease-in-out focus:outline-none focus:border-ily-blue focus:bg-gray-600"
        />
        <button 
          type="submit" 
          className="py-2 px-4 border-none rounded-full cursor-pointer font-semibold text-white bg-ily-gradient transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
        >
          Search
        </button>
      </form>

      {/* Watchlist Button */}
      <div className="absolute top-0 left-0 md:relative md:top-0 md:left-0 z-10 md:z-auto flex items-center order-0 md:order-none">
        <Link 
          to="/watchlist" 
          className="no-underline text-white py-2 px-2 md:border-2 md:border-ily-blue border-none rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-transparent relative p-0 md:p-2 text-3xl md:text-base hover:scale-110 md:hover:scale-105 md:hover:bg-ily-gradient md:hover:border-transparent md:hover:shadow-[0_4px_8px_rgba(54,189,242,0.3)]"
        >
          {/* Mobile Icon (Only visible on mobile) */}
          <span className="block md:hidden bg-clip-text text-transparent bg-ily-gradient font-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">💙</span> 
          
          {/* Desktop Text (Only visible on PC) */}
          <span className="hidden md:block">My List</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;