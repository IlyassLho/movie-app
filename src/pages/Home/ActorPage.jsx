import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { decodeId, encodeId } from '../../utils/security'; // These functions for encoding/decoding IDs
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const PersonPage = () => {
  const { slug } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personId = decodeId(slug);

        const [personRes, creditsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/person/${personId}`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${API_BASE_URL}/person/${personId}/movie_credits`, {
            params: { api_key: API_KEY }
          })
        ]);

        setPerson(personRes.data);
        const sortedMovies = creditsRes.data.cast
          .filter(m => m.poster_path)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          
        setCredits(sortedMovies);
      } catch (error) {
        console.error("Error fetching person data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <LoadingSpinner />
  if (!person) return <div className="min-h-screen flex items-center justify-center bg-ily-dark text-white">Person not found.</div>;

  return (
    <div className="min-h-screen bg-ily-dark text-white pt-10 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* === SECTION 1: PROFILE HEADER === */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 animate-fadeIn">
          {/* Image */}
          <div className="flex-shrink-0">
            <img 
              src={`${IMAGE_BASE_URL}${person.profile_path}`} 
              alt={person.name} 
              className="w-64 h-96 object-cover rounded-xl shadow-[0_0_20px_rgba(54,189,242,0.3)] border-2 border-gray-800"
            />
          </div>

          {/* Bio & Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-ily-gradient">
              {person.name}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm mb-6">
              {person.birthday && <span>🎂 {person.birthday}</span>}
              {person.place_of_birth && <span>📍 {person.place_of_birth}</span>}
            </div>

            <h3 className="text-xl font-bold mb-2 text-white md:border-l-4 md:border-ily-purple pl-3 ml-4 md:ml-0">Biography</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl mx-auto md:mx-0">
              {person.biography || "No biography available for this actor."}
            </p>
          </div>
        </div>

        {/* === SECTION 2: FILMOGRAPHY (GRID) === */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-800 pb-2">
          Filmography <span className="text-gray-500 text-lg font-normal">({credits.length} Movies & TV Shows)</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {credits.map((Similar) => (
            <Link 
              to={`/movie/${encodeId(Similar.id)}`} 
              key={Similar.id}
              className="relative group bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-ily-blue/20"
            >
              <div className="relative aspect-[2/3]">
                <img 
                  src={`${IMAGE_BASE_URL}${Similar.poster_path}`} 
                  alt={Similar.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">{Similar.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-400 text-xs">
                    {Similar.release_date ? Similar.release_date.substring(0, 4) : 'N/A'}
                  </span>
                  {Similar.vote_average > 0 && (
                    <span className="text-yellow-400 text-xs font-bold">⭐ {Similar.vote_average.toFixed(1)}</span>
                  )}
                </div>
                {/* Character Name */}
                {Similar.character && (
                   <p className="text-gray-500 text-xs mt-1 truncate">as {Similar.character}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PersonPage;