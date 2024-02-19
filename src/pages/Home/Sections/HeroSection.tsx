

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { heroImages } from "../../../data/images";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";

const HeroSection = () => {
  return (
    <section>
      <div>
        <div>
          <header>
            <h1>unleash your Fashion</h1>
            <h1>find your Flow.</h1>
          </header>
          <div>
            <ButtonComponent>Shop Now</ButtonComponent>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {heroImages.map((items) => {
              return (
                <SwiperSlide>
                  <img srcSet={items.path} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
