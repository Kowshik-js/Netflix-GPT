import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const VideoBackground = ({movieId}) => {
  const trailerVideo = useSelector(store=> store.movies?.trailerVideo);
  const dispatch = useDispatch();
  
  

const getMovieVideos = async () =>{
  const data=await fetch
  ('https://api.themoviedb.org/3/movie/1100782/videos?language=en-US',
     API_OPTIONS);
  const json = await data.json();
  console.log(json);

  const filterData = json.results.filter(video => video.type === "Trailer");
  const trailer = filterData.length ? filterData[0] : json.results[0];
  console.log(trailer);
  dispatch(addTrailerVideo(trailer));
  };
  useEffect(()=>{
    getMovieVideos();
  },[]
)


  return (
    <div><iframe 
    src={"https://www.youtube.com/embed/FU_bAopCcSE?si=OXDj5LA1drIhAdHc" +trailerVideo.key}
    title="YouTube video player" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    >
    </iframe></div>
  )
}

export default VideoBackground;


