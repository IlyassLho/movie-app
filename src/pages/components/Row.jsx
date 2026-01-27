import { Link } from 'react-router-dom';
import { encodeId } from '../../utils/security';

function Row({ title, data, isTV = false, loading }) {
    if (!loading && (!data || data.length === 0)) return null;

    return (
        <div className="ml-5 md:ml-5 mb-8">
            <h2 className="text-white text-xl md:text-2xl mb-4 border-l-4 border-ily-blue pl-4 font-semibold inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {title}
            </h2>
            <div className="flex overflow-y-hidden overflow-x-scroll py-5 pl-5 gap-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {loading ? (
                    [...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className="flex-none w-[120px] md:w-[170px] h-[180px] md:h-[225px] rounded-md bg-gray-700 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:1000px_100%] animate-shimmer"
                        ></div>
                    ))
                ) : (
                    data.map((item) => {
                        const encryptedId = encodeId(item.id);
                        return (
                            <Link
                                to={`/${isTV ? 'tv' : 'movie'}/${encryptedId}`}
                                key={item.id}
                                className="flex-none w-[120px] md:w-[170px] transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] rounded-md group"
                            >
                                <img
                                    className="w-full h-[180px] md:h-[225px] object-cover rounded-md bg-gray-700 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] block group-hover:scale-[1.08] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.7),0_6px_12px_rgba(0,0,0,0.4)]"
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