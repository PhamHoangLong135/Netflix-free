import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css';

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
      {/*
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
      /> */}
       <button onClick={history.goBack}>
        <div className="back">
          <ArrowBackOutlined />
          Back
        </div>
      </button>
      <Player poster={movies.imgSm}>
      <source src={movie.video} />
      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
    </div>
  );
}
