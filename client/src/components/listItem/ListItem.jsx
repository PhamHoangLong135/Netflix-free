import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function ListItem({ index, item }) {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [favourites, setFavourites] = useState([]);


  // const handleModalOpening = () => {
	// 	dispatch(showModalDetail({movie}));
	// }



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
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
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
    // <div
    //   className="listItem"
    //   style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <Link style={{color:'white'}} to={{ pathname: "/watch", movie: movie }}>
    //     <img src={movie?.imgSm} alt="" />
    //     {isHovered && (
    //       <video src={movie.img ? movie.trailer : movie.video} autoPlay={true} loop />
    //     )}
    //   </Link>

    //   <div className="itemInfo">
    //     <div className="icons">
    //       <Link style={{color:'white'}} to={{ pathname: "/watch", movie: movie }}>
    //         <PlayArrow className="icon" />
    //       </Link>
          
    //       <Add className="icon"
    //         onClick={() => addFavouriteMovie(movie)}
    //       />
    //       <ThumbUpAltOutlined tabIndex="0" className="icon iconLike" />
    //       <ThumbDownOutlined tabIndex="0" className="icon iconDislike" />

    //     </div>
    //     <div className="itemInfoTop">
    //       <span>{movie?.duration}</span>
    //       <span className="limit">+{movie?.limit}</span>
    //       <span>{movie?.year}</span>
    //     </div>

    //     <div className="desc">{movie?.desc}</div>
    //     <div className="genre">{movie?.genre}</div>
    //   </div>

    // </div>
    <div
			className={`Row__poster ${"Row__poster--big"}`}
			// onClick={handleModalOpening}
		>
			
			<img src={movie?.imgSm} alt={movie?.title} />
	
			<div className="Row__poster-info">
				<div className="Row__poster-info--iconswrp">
					<Link
						className="Row__poster-info--icon icon--play"
						// onClick={handlePlayAction}
						to={{ pathname: "/watch", movie: movie }}
					>
						<FaPlay />
					</Link>
							<button className='Row__poster-info--icon icon--favourite' 
              onClick={() => addFavouriteMovie(movie)}
              >
								<FaPlus />
							</button>
					<button className='Row__poster-info--icon icon--toggleModal'>
						<FaChevronDown 
            // onClick={handleModalOpening}
            />
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
  );
}
