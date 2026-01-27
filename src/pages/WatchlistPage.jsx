import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { encodeId } from '../utils/security';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function WatchlistPage() {
    const movies = useSelector((state) => state.watchlist.movies);

    return (
        <div className="min-h-screen bg-ily-dark text-white pt-24 px-4 pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-ily-gradient">
                🎬 My Watchlist <span className="text-gray-400">({movies.length})</span>
            </h2>

            {movies.length === 0 ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-gray-400 text-lg md:text-xl">
                            📭 Your list is empty.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                                className="group"
                            >
                                {/* card for the item */}
                                <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.6)] cursor-pointer">
                                    <div className="h-[270px] md:h-[300px] bg-gray-700 overflow-hidden">
                                        <img
                                            src={`${IMAGE_BASE_URL}${item.poster_path}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-sm md:text-base text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                                            {item.title}
                                        </h3>
                                        <span className="text-yellow-400 text-xs md:text-sm">⭐ {item.vote_average?.toFixed(1)}</span>
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