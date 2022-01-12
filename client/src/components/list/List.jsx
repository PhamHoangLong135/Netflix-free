import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";
import useViewport from "../../hooks/useViewPort";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FiChevronRight } from "react-icons/all";
// Swiper
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination]);

export default function List({ list }) {
  const { width } = useViewport();
  //Custom Swiper config
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const customSwiperParams = {
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    breakpoints: {
      1378: { slidesPerView: 6, slidesPerGroup: 6 },
      998: { slidesPerView: 4, slidesPerGroup: 4 },
      625: { slidesPerView: 3, slidesPerGroup: 3 },
      330: { slidesPerView: 2, slidesPerGroup: 2 },
      0: { slidesPerView: 1.5, slidesPerGroup: 1.5 },
    },
    loopAdditionalSlides:
      width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
    pagination: true,
    loop: false,
    grabCursor: false,
    draggable: false,
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
  };

  const rightMouseOver = (e) => {
    if (e.currentTarget.classList.contains("right")) {
      e.currentTarget.parentElement.classList.add("is-right");
    } else if (e.currentTarget.classList.contains("left")) {
      e.currentTarget.parentElement.classList.add("is-left");
    }
  };

  const rightMouseOut = (e) => {
    e.currentTarget.parentElement.classList.remove("is-right", "is-left");
  };

  const insertPositionClassName = (index) => {
    const i = index + 1;

    if (i === 1) return "left";
    else if (i === 20) return "right";

    if (width >= 1378) {
      if ([7, 13, 19].includes(i)) return "left";
      else if ([6, 12, 18].includes(i)) return "right";
    } else if (width >= 998) {
      if ([5, 9, 13, 17].includes(i)) return "left";
      else if ([4, 8, 12, 16].includes(i)) return "right";
    } else if (width >= 768) {
      if ([4, 7, 10, 13, 16].includes(i)) return "left";
      else if ([3, 6, 9, 12, 15, 18].includes(i)) return "right";
    }
  };

  return (
    <div className="Row">
      <div className="Row__not-loaded"></div>
      <h3 className="Row__title">
        <span>{list.title}</span>
      </h3>
      <div className="Row__poster--wrp">
        <div className="Row__slider--mask left" ref={navigationPrevRef}>
          <MdChevronLeft
            className="Row__slider--mask-icon left"
            size="3em"
            style={{ color: "white" }}
          />
        </div>
        <div className="Row__slider--mask right" ref={navigationNextRef}>
          <MdChevronRight
            className="Row__slider--mask-icon right"
            size="3em"
            style={{ color: "white" }}
          />
        </div>
        <Swiper
          {...customSwiperParams}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
        >
          {list &&
            list.content.map((item, index) => (
              <SwiperSlide
                key={index}
                className={insertPositionClassName(index)}
                onMouseOver={rightMouseOver}
                onMouseOut={rightMouseOut}
              >
                <ListItem key={index} item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
