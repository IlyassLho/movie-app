const LoadingSpinner = () => {
  const bars = Array(12).fill(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ily-dark/80 backdrop-blur-sm">

      <div className="relative w-16 h-16 flex items-center justify-center animate-spin [animation-duration:1s]">
        {bars.map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[20%] bg-ily-blue rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-140%)`,
              opacity: 1 - (i / 12),
              boxShadow: '0 0 4px rgba(54, 189, 242, 0.6)'
            }}
          ></div>
        ))}
      </div>

      <div className="absolute mt-28 text-ily-blue font-bold tracking-widest text-sm animate-pulse">
        LOADING...
      </div>

    </div>
  );
};

export default LoadingSpinner;