import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      
      <h1 className="text-9xl font-extrabold mb-2 bg-clip-text text-transparent bg-ily-gradient animate-pulse">
        404
      </h1>

      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
        Page Not Found 😢
      </h2>

      <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      <Link 
        to="/" 
        className="px-8 py-3 bg-ily-gradient text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(111,66,193,0.5)]"
      >
        Go Home 🏠
      </Link>
    </div>
  );
};

export default NotFound;