import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  const history = useHistory();
  const [movies, setMovies] = useState({});
  const [list, setList] = useState([]);
  const vid = document.getElementById("myVideo");
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movie/find/" + movie._id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);

  useEffect(() => {
    const currentMovie = JSON.parse(localStorage.getItem("itemTime"));
    if (currentMovie) {
      setList(currentMovie);
    }
  }, []);
  const prevNext = () => {
    vid.currentTime -= 10;
  };
  const skipNext = () => {
    vid.currentTime += 10;
  };

  return (
    <div className="watch">
      <button onClick={history.goBack}>
        <div className="back">
          <ArrowBackOutlined />
          Back
        </div>
      </button>
      <div class="prev" onClick={prevNext}>
        <SkipPreviousIcon />
      </div>
      <div className="next" onClick={skipNext}>
        <SkipNextIcon />
      </div>
      <video
        id="myVideo"
        className="video"
        autoPlay
        progress
        controls
        src={movies.video}
      />
    </div>
  );
}
