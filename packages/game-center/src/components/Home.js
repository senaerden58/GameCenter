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
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="flex justify-center items-center h-full text-white text-3xl font-bold bg-blue-900">
            Slide 1 - Oyun İçeriği
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center h-full text-white text-3xl font-bold bg-purple-900">
            Slide 2 - Yeni Güncellemeler
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center h-full text-white text-3xl font-bold bg-red-900">
            Slide 3 - Turnuvalar
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
