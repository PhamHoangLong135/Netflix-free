import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

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

  return (

    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link Style="color:white" to={{ pathname: "/watch", movie: movie }}>
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <video src={movie.img ? movie.trailer : movie.video} autoPlay={true} loop />
        )}
      </Link>
      
      <div className="itemInfo">
        <div className="icons">
          <Link Style="color:white" to={{ pathname: "/watch", movie: movie }}>
            <PlayArrow className="icon" />
          </Link>
          <Add className="icon" />
          <ThumbUpAltOutlined className="icon iconLike" />
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
  );
}
