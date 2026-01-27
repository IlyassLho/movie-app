import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeId, encodeId } from '../../utils/security';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../redux/watchlistSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMAGE_BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

function DetailsPage() {
    const { type, slug } = useParams();
    const navigate = useNavigate();

    // State Variables
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);
    const [openingKey, setOpeningKey] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);

    // Redux State Management
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.watchlist.movies);
    const isInWatchlist = content ? watchlist.some(movie => movie.id === content.id) : false;

    // Data Fetching Logic
    useEffect(() => {
        const fetchData = async () => {
            try {
                const decryptedId = decodeId(slug);
                if (!decryptedId) throw new Error("Invalid ID");

                const [detailsRes, videosRes, creditsRes, similarRes] = await Promise.all([
                    // Request 1: Details
                    axios.get(`${API_BASE_URL}/${type}/${decryptedId}`, {
                        params: { api_key: API_KEY, language: 'en-US' }
                    }),
                    // Request 2: Trailers/Videos
                    axios.get(`${API_BASE_URL}/${type}/${decryptedId}/videos`, {
                        params: { api_key: API_KEY, language: 'en-US' }
                    }),
                    // Request 3: Credits
                    axios.get(`${API_BASE_URL}/${type}/${decryptedId}/credits`, {
                        params: { api_key: API_KEY, language: 'en-US' }
                    }),
                    // Request 4: Similar
                    axios.get(`${API_BASE_URL}/${type}/${decryptedId}/similar`, {
                        params: { api_key: API_KEY }
                    }),
                ]);

                setContent(detailsRes.data);
                setCast(creditsRes.data.cast.slice(0, 20)); // Get top 20 cast members

                // Videos Logic
                const videos = videosRes.data.results;
                const trailer = videos.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
                const opening = videos.find(vid => vid.type === "Opening Credits" && vid.site === "YouTube");

                // Similar Movies Logic
                const validSimilar = similarRes.data.results
                    .filter(m => m.poster_path)
                    .slice(0, 10);

                setSimilar(validSimilar);

                if (trailer) setTrailerKey(trailer.key);
                if (opening) setOpeningKey(opening.key);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0); // Scroll to top on page change
    }, [type, slug]);

    const handleToggleWatchlist = () => {
        // Check if content is available
        if (content) {
            const movieData = {
                id: content.id,
                title: content.title || content.name,
                poster_path: content.poster_path,
                vote_average: content.vote_average,
                media_type: type
            };

            if (isInWatchlist) {
                dispatch(removeFromWatchlist(movieData));
                toast.error("Removed from list 💔");
            } else {
                dispatch(addToWatchlist(movieData));
                toast.success("Added to list ❤️");
            }
        }
    };

    // Handle click on similar movie
    const handleSimilarClick = (id) => {
        const newSlug = encodeId(id);
        navigate(`/${type}/${newSlug}`);
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-ily-dark text-white text-xl">Loading...</div>;
    if (!content) return <div className="flex items-center justify-center min-h-screen bg-ily-dark text-white text-xl">Content not found.</div>;

    const title = content.title || content.name;
    const date = content.release_date || content.first_air_date;
    const year = date ? date.substring(0, 4) : 'N/A';

    return (
        <div
            className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat bg-ily-dark text-white flex items-center p-0 mt-0"
            style={{
                backgroundImage: content.backdrop_path
                    ? `url(${IMAGE_BACKDROP_URL}${content.backdrop_path})`
                    : 'none'
            }}
        >
            {/* Black gradient layer logo */}
            <div className="absolute inset-0 bg-gradient-to-t from-ily-dark via-ily-dark/80 to-transparent z-[1]"></div>

            <div className="relative z-[2] flex flex-col items-center md:flex-row md:items-start max-w-7xl mx-auto px-4 py-10 md:py-16 gap-8 md:gap-12 animate-fadeIn w-full">

                <div className="flex-none w-full md:w-80 md:flex-shrink-0 flex justify-center md:justify-start">
                    <img
                        src={`${IMAGE_BASE_URL}${content.poster_path}`}
                        alt={title}
                        //Constrained poster width on mobile
                        className="w-[70%] max-w-[250px] rounded-lg shadow-2xl mx-auto mb-6 md:w-80 md:mx-0 md:mr-8 md:mb-0 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                    />
                </div>

                <div className="flex-1 w-full min-w-0">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2.5 text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] leading-tight text-center md:text-left">
                        {title} <span className="font-light text-gray-400 text-2xl md:text-3xl lg:text-4xl">({year})</span>
                    </h1>

                    <div className="flex items-center justify-center md:justify-start gap-5 mb-5 text-base md:text-lg font-semibold">
                        <span className="text-yellow-400">⭐ {content.vote_average?.toFixed(1)}</span>

                        {content.runtime && (
                            <span className="text-gray-400"> {Math.floor(content.runtime / 60)}h {content.runtime % 60}m</span>
                        )}
                        {content.number_of_seasons && (
                            <span className="text-gray-400"> {content.number_of_seasons} Seasons</span>
                        )}
                    </div>

                    <div className="mb-6 text-base text-white flex flex-wrap justify-center md:justify-start gap-2">
                        {content.genres?.map(g => (
                            <span key={g.id} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col w-full max-w-[90%] mx-auto gap-3 mt-6 md:flex-row md:w-auto md:mx-0 md:gap-4 mb-8">
                        <button
                            className={`w-full md:w-auto px-7 py-3 text-lg font-bold rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center gap-2 ${isInWatchlist
                                ? "bg-gray-600/50 text-white hover:bg-gray-600/70"
                                : "bg-ily-gradient text-white hover:brightness-110"
                                } hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]`}
                            onClick={handleToggleWatchlist}
                        >
                            {isInWatchlist ? "💔 Remove" : "❤️ Add to List"}
                        </button>

                        {trailerKey && (
                            <button
                                className="w-full md:w-auto bg-white text-black hover:bg-gray-200 px-7 py-3 text-lg font-bold rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                                onClick={() => setPlayingVideo(trailerKey)}
                            >
                                ▶ Play Trailer
                            </button>
                        )}

                        {openingKey && (
                            <button
                                className="w-full md:w-auto bg-white text-black hover:bg-gray-200 px-7 py-3 text-lg font-bold rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                                onClick={() => setPlayingVideo(openingKey)}
                            >
                                🎵 Opening Credits
                            </button>
                        )}
                    </div>

                    <div className="mb-8 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl text-white mb-2.5">Overview</h3>
                        <p className="leading-relaxed text-gray-300 text-base md:text-lg max-w-3xl mx-auto md:mx-0">{content.overview}</p>
                    </div>

                    {/* Top Cast Section */}
                    {cast.length > 0 && (
                        <div className="mt-8 w-full max-w-[100vw] overflow-hidden">
                            <h3 className="mb-4 text-xl md:text-2xl text-white border-l-4 border-ily-blue pl-2.5 ml-4 md:ml-0">Top Cast</h3>
                            <div className="flex overflow-x-auto pb-4 gap-4 w-full px-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {cast.map((actor) => {
                                    if (actor.profile_path) {
                                        return (
                                            <div key={actor.id} className="min-w-[100px] w-[100px] text-center flex-shrink-0 group">
                                                <div className="w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mb-2.5 border-2 border-transparent transition-all duration-300 ease-in-out bg-gray-700 group-hover:border-white group-hover:scale-105">
                                                    <img
                                                        src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                                                        alt={actor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-sm text-white font-bold m-0 whitespace-nowrap overflow-hidden text-ellipsis">{actor.name}</p>
                                                <p className="text-xs text-gray-400 m-0 whitespace-nowrap overflow-hidden text-ellipsis">{actor.character}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )}

                    {/* Similar Movies Section */}
                    {similar.length > 0 && (
                        <div className="mt-10 w-full mb-12 max-w-[100vw] overflow-hidden">
                            <h3 className="mb-4 text-xl md:text-2xl text-white border-l-4 border-ily-blue pl-2.5 ml-4 md:ml-0">More Like This</h3>
                            <div className="flex overflow-x-auto pb-4 gap-4 w-full px-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {similar.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="min-w-[140px] w-[140px] cursor-pointer transition-transform duration-300 ease-in-out rounded-lg overflow-hidden flex-shrink-0 hover:scale-[1.08]"
                                        onClick={() => handleSimilarClick(movie.id)}
                                    >
                                        <img
                                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                            alt={movie.title || movie.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Modal */}
            {playingVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fadeIn"
                    onClick={() => setPlayingVideo(null)}
                >
                    <div className="relative w-[95%] md:w-4/5 max-w-[900px] aspect-video bg-black rounded-[10px] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        <iframe
                            src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-[10px]"
                        ></iframe>
                        <button
                            className="absolute -top-10 right-0 bg-transparent border-none text-white text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:text-red-500 hover:scale-110"
                            onClick={(e) => {
                                e.stopPropagation();
                                setPlayingVideo(null);
                            }}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsPage;