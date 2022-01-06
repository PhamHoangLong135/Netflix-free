import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";



export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  const dispatch = useDispatch();



  const handleModalOpening = () => {
		dispatch(showModalDetail(content));
	}

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    // <div className="featured">
    //   {type && (
    //     <div className="category">
    //       <span>{type === "series" ? "Series" : "Movies"}</span>
    //       <select
    //         name="genre"
    //         id="genre"
    //         onChange={(e) => setGenre(e.target.value)}
    //       >
    //         <option>Genre</option>
    //         <option value="adventure">Adventure</option>
    //         <option value="comedy">Comedy</option>
    //         <option value="crime">Crime</option>
    //         <option value="fantasy">Fantasy</option>
    //         <option value="historical">Historical</option>
    //         <option value="horror">Horror</option>
    //         <option value="romance">Romance</option>
    //         <option value="sci-fi">Sci-fi</option>
    //         <option value="thriller">Thriller</option>
    //         <option value="western">Western</option>
    //         <option value="animation">Animation</option>
    //         <option value="drama">Drama</option>
    //         <option value="documentary">Documentary</option>
    //       </select>
    //     </div>
    //   )}
    //   <img src={content?.img} alt="" />
    //   <div className="info">
    //     <img src={content?.imgTitle} alt="" />
    //     <span className="desc">{content?.desc}</span>
    //     <div className="buttons">
    //       <Link
    //         style={{ textDecoration: "none" }}
    //         to={{ pathname: "/watch", movie: content }}
    //       >
    //         <button className="play">
    //           <PlayArrow />
    //           <span>Play</span>
    //         </button>
    //       </Link>
    //       <button onClick={handleModalOpening} className="more">
    //         <InfoOutlined />
    //         <span>Info</span>
    //       </button>
    //     </div>
    //   </div>
    //   <div className="infoBottom" />
    // </div>
    <>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
			</motion.section>
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url(${content?.img})`}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{content?.title}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							<Link
								className="Banner__button"
								// onClick={handlePlayAnimation}
								to={{ pathname: "/watch", movie: content }}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{content?.desc}</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
		</>
  );
}
