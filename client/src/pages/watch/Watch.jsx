import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import BigPlayButton from "video-react/lib/components/BigPlayButton";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  const history = useHistory();
  const [movies, setMovies] = useState({});
  const [list, setList] = useState({ video: movie.video });
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

  const saveTime = () => {
    const vid = document.getElementById("myVideo");
    localStorage.setItem(`${movie._id}`, vid.currentTime);
    history.goBack();
  };

  useEffect(() => {
    const watched = localStorage.getItem(`${movie._id}`);
    const vid = document.getElementById("myVideo");
    if (movie) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key){
          vid.currentTime = watched;
        }else{
          vid.currentTime = 0;
        }
      }
    }
  });

  // console.log(movie.video);
  return (
    <div className="watch">
      <button onClick={saveTime}>
        <div className="back">
          <ArrowBackOutlined />
          Back
        </div>
      </button>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie.video}
        id="myVideo"
      />
    </div>
  );
}
