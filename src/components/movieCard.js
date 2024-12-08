import React from 'react';
import { IMG_CON_URL } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
  console.log("Poster Path:", posterPath);

  return (
    <div className="w-48 pr-4">
      <img
        alt="movie card"
        src={posterPath ? IMG_CON_URL + posterPath : "https://via.placeholder.com/500"}
      />
    </div>
  );
};

export default MovieCard;
