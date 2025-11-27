import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetailPage.css';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailPage() {
  const { imdb_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdb_id) {
      setError("No movie ID provided.");
      setLoading(false);
      return;
    }

    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/movie/${imdb_id}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
          },
        });

        setMovie(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.status === 404) {
            setError("Movie not found. Please check the ID.");
        } else {
            setError(err.message || "Failed to fetch movie details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [imdb_id]);

  if (loading) {
    return <div className="detail-loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="detail-error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="detail-not-found">Movie not found.</div>;
  }

  return (
    <div className="movie-detail-page">
      <div className="detail-poster">
        {movie.poster_path ? (
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )}
      </div>
      <div className="detail-info">
        <h1>{movie.original_title} ({movie.release_date ? movie.release_date.substring(0,4) : 'N/A'})</h1>
        {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
        <p><strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
        <p>
          <strong>Genres:</strong> {movie.genres && movie.genres.map(g => g.name).join(', ')}
        </p>
        <p className="detail-overview">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetailPage;