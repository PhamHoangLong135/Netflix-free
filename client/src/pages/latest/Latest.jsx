import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./latest.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

//
SwiperCore.use([Pagination, Navigation]);

export default function Latest() {
  const [newList, setNewList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getNewList = async () => {
      try {
        const res = await axios.get(`/movie`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        console.log(res.data);
        setNewList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewList();
  }, []);
  return (
    <div className="listItem11">
      <Navbar />
      <div className="list_Item_Swiper">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
        >
          {newList &&
            newList.map((newLists, index) => (
              <SwiperSlide className="swiperWidth">
                <Link
                  Style="color:white"
                  to={{ pathname: "/watch", movie: newLists }}
                >
                  <img src={newLists?.imgSm} alt="" />
                  {isHovered && (
                    <video
                      src={newLists.img ? newLists.trailer : newLists.video}
                      autoPlay={true}
                      loop
                    />
                  )}
                </Link>
                <div className="itemInfo">
                  <div className="icons">
                    <Link
                      Style="color:white"
                      to={{ pathname: "/watch", movie: newLists }}
                    >
                      <PlayArrow className="icon" />
                    </Link>
                    <Add className="icon" />
                    <ThumbUpAltOutlined className="icon iconLike" />
                    <ThumbDownOutlined className="icon iconDislike" />
                  </div>
                  <div className="itemInfoTop">
                    <span>{newLists?.duration}</span>
                    <span className="limit">+{newLists?.limit}</span>
                    <span>{newLists?.year}</span>
                  </div>
                  <div className="desc">{newLists?.desc}</div>
                  <div className="genre">{newLists?.genre}</div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Footer className="ftBtn" />
    </div>
  );
}
