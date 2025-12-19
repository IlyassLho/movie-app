import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { encodeId } from '../../utils/security';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setResults([]);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/search/multi`, {
                    params: {
                        api_key: API_KEY,
                        query: query,
                        include_adult: false,
                    },
                });

                // Sort by Popularity
                const validResults = response.data.results
                    .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                    .sort((a, b) => b.popularity - a.popularity);

                setResults(validResults);
            } catch (error) {
                console.error("Error searching:", error);
            } finally {
                setLoading(false);
            }
        };
        
        const delayDebounce = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(delayDebounce);

    }, [query]);

    return (
        <div className="search-page">
            {query && <h2>Results for: <span>"{query}"</span></h2>}

            {loading ? (
                <div className="loading-message">Searching...</div>
            ) : results.length > 0 ? (

                <div className="search-grid">
                    {results.map((item) => {
                        if (!item.poster_path) return null;
                        
                        const encryptedId = encodeId(item.id);
                        const isTV = item.media_type === 'tv';

                        return (
                            <Link
                                to={`/${isTV ? 'tv' : 'movie'}/${encryptedId}`}
                                key={item.id}
                                className="search-card-link"
                            >
                                <div className="search-card">
                                    <div className="search-poster">
                                        <img
                                            src={`${IMAGE_BASE_URL}${item.poster_path}`}
                                            alt={item.title || item.name}
                                        />
                                    </div>
                                    <div className="search-info">
                                        <h3>{item.title || item.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            ) : (
                query && (
                    <div className="no-results">
                        <p>No results found for "{query}"</p>
                    </div>
                )
            )}
        </div>
    );
}

export default SearchPage;