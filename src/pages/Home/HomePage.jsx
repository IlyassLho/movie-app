import { useState, useEffect } from 'react';
import axios from 'axios';
import Row from '../components/Row';
import '../../Style/Home.css';

// API Settings 
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

function HomePage() {
  // Movies
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // TV Shows
  const [trendingTV, setTrendingTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, popularRes, topRatedRes, TVtrendingRes, TVpopularRes, TVtopRatedRes] = await Promise.all([
          // -------- Movies Requests --------
          axios.get(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
          axios.get(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          // -------- TV Shows Requests --------
          axios.get(`${API_BASE_URL}/trending/tv/day?api_key=${API_KEY}`),
          axios.get(`${API_BASE_URL}/tv/popular?api_key=${API_KEY}`),
          axios.get(`${API_BASE_URL}/tv/top_rated?api_key=${API_KEY}`),
        ]);

        // -------- Movies Data --------
        setTrendingMovies(trendingRes.data.results);
        setPopularMovies(popularRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
        // -------- TV Shows Data --------
        setTrendingTV(TVtrendingRes.data.results);
        setPopularTV(TVpopularRes.data.results);
        setTopRatedTV(TVtopRatedRes.data.results);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">

      {/* Movies */}
      <Row title="Trending Movies" data={trendingMovies} loading={loading} />
      <Row title="Popular Movies" data={popularMovies} loading={loading} />
      <Row title="Top Rated Movies" data={topRatedMovies} loading={loading} />

      {/* TV Shows */}
      <Row title="Trending TV Shows" data={trendingTV} isTV={true} loading={loading} />
      <Row title="Popular TV Shows" data={popularTV} isTV={true} loading={loading} />
      <Row title="Top Rated TV Shows" data={topRatedTV} isTV={true} loading={loading} />

    </div>
  );
}

export default HomePage;