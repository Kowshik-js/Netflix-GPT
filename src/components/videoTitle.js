const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-4">
        {/* Play Button */}
        <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300">
          ▶️ Play
        </button>

        {/* More Info Button */}
        <button className="bg-gray-500 bg-opacity-70 text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-400 transition-all duration-300">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
