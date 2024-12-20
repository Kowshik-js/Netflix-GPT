import { useSelector } from "react-redux";
import VideoBackground from "./videoBackground";
import VideoTitle from "./videoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (! movies) return;

  const mainMovie = movies[1];
  console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-white md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;