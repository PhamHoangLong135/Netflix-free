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
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Featured from "../../components/featured/Featured";
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../motionUtils";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";

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
  }, []);

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
    // <div className="pageList">
    //   <Navbar/>
    //   <div className="title">My list</div>
    //   {myMovie &&
    //     myMovie.map((movie, index) => (
    //       <div
    //         className="myList"
    //         style={{ left: isHovered && index * 150 - 50 + index * 2 }}
    //         // onMouseEnter={() => setIsHovered(true)}
    //         // onMouseLeave={() => setIsHovered(false)}
    //         key={index}
    //       >
    //         <Link style={{color:'white'}} to={{ pathname: "/watch", movie: movie }}>
    //           <img src={movie?.imgSm} alt="" />
    //           {isHovered && (
    //             <video
    //               src={movie.img ? movie.trailer : movie.video}
    //               autoPlay={false}
    //               loop
    //             />
    //           )}
    //         </Link>

    //         <div className="itemInfo">
    //           <div className="icons">
    //             <Link
    //               style={{color:'white'}}
    //               to={{ pathname: "/watch", movie: movie }}
    //             >
    //               <PlayArrow className="icon" />
    //             </Link>
    //             <DoneOutlinedIcon
    //               className="icon"
    //               onClick={() => removeFavouriteMovie(movie)}
    //             />
    //             <ThumbUpAltOutlined
    //               className="icon iconLike"
    //               onClick={() => removeFavouriteMovie(movie)}
    //             />
    //             <ThumbDownOutlined className="icon iconDislike" />
    //           </div>
    //             <div className="itemInfoTop">
    //               <span>{movie?.duration}</span>
    //               <span className="limit">+{movie?.limit}</span>
    //               <span>{movie?.year}</span>
    //             </div>

    //             <div className="desc">{movie?.desc}</div>
    //             <div className="genre">{movie?.genre}</div>
    //           </div>
    //         </div>
    //     ))}
    //     <Footer />
    // </div>
    <div className="pageList">
      <Navbar />
      <div className="title">My list</div>
      <div className="myList">
        {myMovie &&
          myMovie.map((movie, index) => (
            <motion.div
              variants={posterFadeInVariants}
              className="Poster"
              // onClick={handleModalOpening}
            >
              <img src={movie?.imgSm} alt="" />
              <div className="Poster__info">
                <div className="Poster__info--iconswrp">
                  <Link
                    className="Poster__info--icon icon--play"
                    // onClick={handlePlayAction}
                    to={{ pathname: "/watch", movie: movie }}
                  >
                    <FaPlay />
                  </Link>
                  <button
                    className="Poster__info--icon icon--favourite"
                    onClick={() => removeFavouriteMovie(movie)}
                  >
                    <FaMinus />
                  </button>
                  <button className="Poster__info--icon icon--toggleModal">
                    <FaChevronDown
                    // onClick={handleModalOpening}
                    />
                  </button>
                </div>
                <div className="Poster__info--title">
                  <h3>{movie?.title}</h3>
                </div>
                <div className="Poster__info--genres">
                  <span className="genre-title">{movie?.genre}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
