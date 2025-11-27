import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';


import './Home.css'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        }); 
        setMovies(response.data.results); 

      } catch (err) {
        setError(err.message || 'Failed to fetch movies from TMDb.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading movies...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <h2>Popular Movies</h2>
      <div className="movies-list">
        {movies.map(movie => (
            <Link to={`/detail/${movie.imdb_id}`} key={movie.id} className="movie-card-link">
                <div className="movie-card">
                    {movie.poster_path ? (
                        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                    ) : (
                        <div className="no-image-placeholder">No Image Available</div>
                    )}
                    <div className="movie-card-info">
                        <h3>{movie.original_title}</h3>
                        <p>Rating: {movie.vote_average}</p>
                        <p>{movie.release_date}</p>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;