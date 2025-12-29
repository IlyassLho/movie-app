import { Link } from 'react-router-dom';
import { encodeId } from '../../utils/security';
import '../../Style/App.css';

function Row({ title, data, isTV = false, loading }) {
    if (!loading && (!data || data.length === 0)) return null;

    return (
        <div className="movie-row">
            <h2>{title}</h2>
            <div className="row-posters">
                {loading ? (
                    [...Array(10)].map((_, index) => (
                        <div 
                            key={index} 
                            className="row-poster skeleton" 
                        ></div>
                    ))
                ) : (
                    data.map((item) => {
                        const encryptedId = encodeId(item.id);
                        return (
                            <Link
                                to={`/${isTV ? 'tv' : 'movie'}/${encryptedId}`}
                                key={item.id}
                                className="poster-link"
                            >
                                <img
                                    className="row-poster"
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Row;