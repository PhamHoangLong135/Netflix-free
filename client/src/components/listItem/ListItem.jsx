import "./listItem.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  showModalDetail,
  hideModalDetail,
} from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [favourites, setFavourites] = useState([]);
  const dispatch = useDispatch();

  const handleModalOpening = () => {
    dispatch(showModalDetail(movie));
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movie/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, [favourites]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite._id !== movie._id
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div>
      <div
        className={`Row__poster ${"Row__poster--big"}`}
        onClick={handleModalOpening}
      >
        <img src={movie?.imgSm} alt={movie?.title} />

        <div className="Row__poster-info">
          <div className="Row__poster-info--iconswrp">
            <Link
              className="Row__poster-info--icon icon--play"
              onClick={(e) => e.stopPropagation()}
              to={{ pathname: "/watch", movie: movie, item: item }}
            >
              <FaPlay />
            </Link>
            <button
              className="Row__poster-info--icon icon--favourite"
              onClick={(e) => {
                addFavouriteMovie(movie);
                e.stopPropagation();
              }}
            >
              <FaPlus />
            </button>
            <button className="Row__poster-info--icon icon--toggleModal">
              <FaChevronDown onClick={handleModalOpening} />
            </button>
          </div>
          <div className="Row__poster-info--title">
            <h3>{movie?.title}</h3>
          </div>
          <div className="Row__poster-info--genres">
            <span className="genre-title">{movie?.genre}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
