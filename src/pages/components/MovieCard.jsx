import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../redux/watchlistSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  //1. Get the list of movies in the watchlist from the Redux state
  const watchlist = useSelector((state) => state.watchlist.movies);

  //2. Check if the current movie is already in the watchlist
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  //3. Handler function to toggle the movie in or out of the watchlist
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie)); // remove if the movie is in the watchlist
    } else {
      dispatch(addToWatchlist(movie)); // add if the movie is not in the watchlist
    }
  };

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        
        <button 
          onClick={handleWatchlistToggle}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: isInWatchlist ? "red" : "white"
          }}
        >
          {isInWatchlist ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;