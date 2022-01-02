import React from "react";
import { useEffect, useState } from "react";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "./myList.scss";
import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";

export default function MyList() {
  const [isHovered, setIsHovered] = useState(false);
  const [myMovie, setMyMovie] = useState([]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setMyMovie(movieFavourites);
    }
  }, [myMovie]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = myMovie.filter(
      (favourite) => favourite._id !== movie._id
    );

    setMyMovie(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div>
      {myMovie &&
        myMovie.map((movie, index) => (
          <div
            className="myList"
            style={{ left: isHovered && index * 150 - 50 + index * 2 }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <Link Style="color:white" to={{ pathname: "/watch", movie: movie }}>
              <img src={movie?.imgSm} alt="" />
              {isHovered && (
                <video
                  src={movie.img ? movie.trailer : movie.video}
                  autoPlay={false}
                  loop
                />
              )}
            </Link>

            <div className="itemInfo">
              <div className="icons">
                <Link
                  Style="color:white"
                  to={{ pathname: "/watch", movie: movie }}
                >
                  <PlayArrow className="icon" />
                </Link>
                <DoneOutlinedIcon
                  className="icon"
                  onClick={() => removeFavouriteMovie(movie)}
                />
                <ThumbUpAltOutlined
                  className="icon iconLike"
                  onClick={() => removeFavouriteMovie(movie)}
                />
                <ThumbDownOutlined className="icon iconDislike" />
              </div>
              <div className="itemInfoTop">
                <span>{movie?.duration}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>

              <div className="desc">{movie?.desc}</div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
