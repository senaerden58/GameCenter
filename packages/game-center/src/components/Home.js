import React from "react";
import "../styles/NeonGameBackground.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  return (
    <div className="relative">
      <div className="neon-bg"></div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        effect="fade"
        className="w-full h-screen"  // Full screen height for Swiper
      >
        <SwiperSlide>
        <div className="toyotaSlider">
            <img
              src="/images/morluLogo.jpeg"
              alt="Game Center"
              className="w-full h-auto object-contain"  // Full width, auto height
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="toyotaSlider">
          <img
              src="/images/onden.jpg"
              alt="Game Center"
              className="w-full h-auto object-contain"  // Full width, auto height
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="toyotaSlider">
          <img
              src="/images/yandan.jpg"
              alt="Game Center"
              className="w-full h-auto object-contain"  // Full width, auto height
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="toyotaSlider">
          <img
              src="/images/arkadan.jpg"
              alt="Game Center"
              className="w-full h-auto object-contain"  // Full width, auto height
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
