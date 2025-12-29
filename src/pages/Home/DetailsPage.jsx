import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeId, encodeId } from '../../utils/security';
import axios from 'axios';

import '../../Style/App.css';

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

    // Handle click on similar movie
    const handleSimilarClick = (id) => {
        const newSlug = encodeId(id);
        navigate(`/${type}/${newSlug}`);
    };

    if (loading) return <div className="loading-message">Loading...</div>;
    if (!content) return <div className="error-message">Content not found.</div>;

    const title = content.title || content.name;
    const date = content.release_date || content.first_air_date;
    const year = date ? date.substring(0, 4) : 'N/A';

    return (
        <div 
            className="movie-detail-page" 
            style={{
                backgroundImage: content.backdrop_path 
                    ? `url(${IMAGE_BACKDROP_URL}${content.backdrop_path})` 
                    : 'none'
            }}
        >
            {/* Black gradient layer logo */}
            <div className="detail-overlay"></div>

            <div className="detail-content-wrapper">
                
                <div className="detail-poster">
                    <img 
                        src={`${IMAGE_BASE_URL}${content.poster_path}`} 
                        alt={title} 
                    />
                </div>

                <div className="detail-info">
                    <h1>{title} <span className="detail-year">({year})</span></h1>

                    <div className="detail-stats">
                        <span className="rating">⭐ {content.vote_average?.toFixed(1)}</span>
                        
                        {content.runtime && (
                            <span className="runtime"> {Math.floor(content.runtime / 60)}h {content.runtime % 60}m</span>
                        )}
                        {content.number_of_seasons && (
                            <span className="seasons"> {content.number_of_seasons} Seasons</span>
                        )}
                    </div>

                    <div className="detail-genres">
                        {content.genres?.map(g => (
                            <span key={g.id} className="genre-badge">{g.name}</span>
                        ))}
                    </div>
                    
                    {/* Play Trailer And Opening Credits Buttons */}
                    <div className="action-buttons">
                        {trailerKey && (
                            <button className="play-trailer-btn" onClick={() => setPlayingVideo(trailerKey)}>
                                ▶ Play Trailer
                            </button>
                        )}

                        {openingKey && (
                            <button className="play-trailer-btn" onClick={() => setPlayingVideo(openingKey)}>
                                🎵 Opening Credits
                            </button>
                        )}
                    </div>

                    <div className="detail-overview">
                        <h3>Overview</h3>
                        <p>{content.overview}</p>
                    </div>

                    {/* Top Cast Section */}
                    {cast.length > 0 && (
                        <div className="cast-section">
                            <h3>Top Cast</h3>
                            <div className="cast-list">
                                {cast.map((actor) => (
                                    <div key={actor.id} className="cast-card">
                                        <div className="cast-img">
                                            {actor.profile_path ? (
                                                <img src={`${IMAGE_BASE_URL}${actor.profile_path}`} alt={actor.name} />
                                            ) : (
                                                <div className="no-cast-img">👤</div>
                                            )}
                                        </div>
                                        <p className="actor-name">{actor.name}</p>
                                        <p className="character-name">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Similar Movies Section */}
                    {similar.length > 0 && (
                        <div className="similar-section">
                            <h3>More Like This</h3>
                            <div className="similar-list">
                                {similar.map((movie) => (
                                    <div 
                                        key={movie.id} 
                                        className="similar-card" 
                                        onClick={() => handleSimilarClick(movie.id)}
                                    >
                                        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Modal */}
            {playingVideo && (
                <div className="video-modal" onClick={() => setPlayingVideo(null)}>
                    <div className="video-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button className="close-video-btn" onClick={() => setPlayingVideo(null)}>✖</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsPage;