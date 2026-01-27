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
        <div className="min-h-screen bg-ily-dark text-white pt-24 px-4 pb-12">
            {query && (
                <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-ily-gradient">
                    Results for: <span className="text-gray-400 italic">"{query}"</span>
                </h2>
            )}

            {loading ? (
                <div className="flex items-center justify-center min-h-[60vh] text-gray-400 text-xl">
                    Searching...
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {results.map((item) => {
                        if (!item.poster_path) return null;

                        const encryptedId = encodeId(item.id);
                        const isTV = item.media_type === 'tv';

                        return (
                            <Link
                                to={`/${isTV ? 'tv' : 'movie'}/${encryptedId}`}
                                key={item.id}
                                className="group"
                            >
                                <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.6)] cursor-pointer">
                                    <div className="h-[270px] md:h-[300px] bg-gray-700 overflow-hidden">
                                        <img
                                            src={`${IMAGE_BASE_URL}${item.poster_path}`}
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-sm md:text-base text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                                            {item.title || item.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                query && (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <p className="text-gray-400 text-lg md:text-xl">
                                😔 No results found for "{query}"
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default SearchPage;