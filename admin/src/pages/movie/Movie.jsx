import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { useState, useEffect } from "react";
import storage from "../../firebase";
import axios from "axios";

export default function Movie() {
  const location = useLocation();
  const history = useHistory();
  const movie = location.movie;
  const [movieData, setMovieData] = useState(null);

  // const [trailer, setTrailer] = useState(null);
  const [img, setImg] = useState(null);
  // const [video, setVideo] = useState(null);
  // const [uploaded, setUploaded] = useState(0);
  const { movies, dispatch } = useContext(MovieContext);
  const { movieId } = useParams();
  const [getMovie, setGetMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`/movie/find/${movieId}`, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        setGetMovie(response.data);
      });
  }, []);
  // console.log('Mang moi khi mount',getMovie)
  const handleChange = (e) => {
    const value = e.target.value;
    return setMovieData({
      ...movieData,
      [e.target.name]: value,
    });
  };
  const updateAPIData = () => {
    axios.put(`/movie/${movieId}`, movieData, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    // history.push("/movies");
  };

  // const handleUpdate = async () => {
  //   updateMovie(movieData, dispatch);
  //   // history.push("/movies");
  //   // console.log(movieData);
  // };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie </h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={getMovie.img} alt="" className="productInfoImg" />
            <span className="productName">{getMovie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{getMovie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{getMovie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{getMovie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{getMovie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={
                getMovie && getMovie.title ? getMovie.title : "khong load duoc"
              }
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={
                getMovie && getMovie.year ? getMovie.year : "khong load duoc"
              }
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={
                getMovie && getMovie.genre ? getMovie.genre : "khong load duoc"
              }
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={
                getMovie && getMovie.limit ? getMovie.limit : "khong load duoc"
              }
              name="limit"
              onChange={handleChange}
            />
            {/* <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} onChange={handleChange}/>
            <label>Video</label>
            <input type="file" placeholder={movie.video} onChange={handleChange}/> */}
          </div>

          <div className="productFormRight">
            {/* <div className="productUpload">
              <img src={getMovie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="img"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div> */}
            <button className="productButton" onClick={updateAPIData}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
