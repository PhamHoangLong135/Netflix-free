import "./listFav.scss";
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../motionUtils";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ListFav = ({item, onDelete}) => {
  const dispatch = useDispatch();
  const [myMovie, setMyMovie] = useState([]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setMyMovie(movieFavourites);
    }
  }, []);

  console.log(item)
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

  const handleModalOpening = () => {
    dispatch(showModalDetail(item));
  };

  console.log(onDelete)

  return (
    <motion.div
      variants={posterFadeInVariants}
      className="Poster"
      //   onClick={handleModalOpening}
    >
      <img src={item?.imgSm} alt="" />
      <div className="Poster__info">
        <div className="Poster__info--iconswrp">
          <Link
            className="Poster__info--icon icon--play"
            to={{ pathname: "/watch", movie: item }}
          >
            <FaPlay />
          </Link>
          <button
            className="Poster__info--icon icon--favourite"
            onClick={() => onDelete(item)}
          >
            <FaMinus />
          </button>
          <button className="Poster__info--icon icon--toggleModal">
            <FaChevronDown onClick={handleModalOpening} />
          </button>
        </div>
        <div className="Poster__info--title">
          <h3>{item?.title}</h3>
        </div>
        <div className="Poster__info--genres">
          <span className="genre-title">{item?.genre}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ListFav;
