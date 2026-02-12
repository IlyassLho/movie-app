import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`
        bg-gray-800 pt-4
        fixed top-0 left-0 w-full z-50 
        text-white p-4 px-6 
        flex flex-col md:flex-row md:justify-between md:items-center 
        gap-2 md:gap-0 
        transition-all duration-500 ease-in-out
        ${isScrolled && (
          'bg-ily-dark/95 shadow-lg backdrop-blur-sm py-4'
        )}
      `}
    >
      {/* Logo */}
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
          className={`
            py-2 px-3 rounded-full text-white w-full md:w-[350px] 
            transition-all duration-300 ease-in-out focus:outline-none focus:border-ily-blue
            ${isScrolled 
              ? 'bg-gray-700 border border-gray-600'
              : 'bg-black/50 border border-gray-500/50 backdrop-blur-md'
            }
          `}
        />
        <button 
          type="submit" 
          className="hidden md:block py-2 px-4 border-none rounded-full cursor-pointer font-semibold text-white bg-ily-gradient transition-all duration-300 ease-in-out hover:scale-95 hover:brightness-95"
        >
          Search
        </button>
      </form>

      {/* Watchlist Button */}
      <div className="absolute top-0 left-0 md:relative md:top-0 md:left-0 z-10 md:z-auto flex items-center order-0 md:order-none">
        <Link 
          to="/watchlist"
          className="no-underline  font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-transparent relative p-0 text-3xl md:text-base"
        >
          {/* Mobile Icon (Only visible on mobile) */}
          <span className="block md:hidden py-2 px-2 bg-clip-text text-transparent bg-ily-gradient font-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">💙</span> 
          
          {/* Desktop Text (Only visible on PC) */}
          <span className="hidden md:block py-2 px-4 border-none rounded-full cursor-pointer font-semibold text-white bg-ily-gradient transition-all duration-300 ease-in-out hover:scale-95 hover:brightness-110">My List</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;