import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { encodeId } from '../utils/security';
import '../Style/App.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function WatchlistPage() {
    const movies = useSelector((state) => state.watchlist.movies);

    return (
        <div className="search-page">
            <h2>🎬 My Watchlist <span>({movies.length})</span></h2>

            {movies.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#777' }}>
                    <h3>Your list is empty.</h3>
                </div>
            ) : (
                <div className="search-grid">
                    {movies.map((item) => {
                        // encode the id
                        const encryptedId = encodeId(item.id);
                        // get the type of the item
                        const type = item.media_type; 

                        return (
                            // link to the details page
                            <Link
                                to={`/${type}/${encryptedId}`}
                                key={item.id}
                                className="search-card-link"
                            >
                                {/* card for the item */}
                                <div className="search-card">
                                    <div className="search-poster">
                                        <img
                                            src={`${IMAGE_BASE_URL}${item.poster_path}`}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="search-info">
                                        <h3>{item.title}</h3>
                                        <span style={{color: "gold", fontSize:"0.8rem"}}>⭐ {item.vote_average?.toFixed(1)}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default WatchlistPage;