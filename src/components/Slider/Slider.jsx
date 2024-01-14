import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import './slider.css';
import styles from './Slider.module.css';
import SlideCard from './SlideCard';

export default function Slider({sliderList,direction}) {
    // let sliderMovieList=[...movieList?.results];
    // let sliderTvList=[...tvList?.results];
    // let sliderPersonList=[...personList?.results];

    // let sliderList = sliderMovieList.concat(sliderTvList,sliderPersonList);
    
//    console.log("slider list", sliderList);

  return (
    <div className={`${styles.section} d-md-block d-lg-none `}>
       <Swiper
       effect={'coverflow'}
       grabCursor={true}
       coverflowEffect={{
         rotate: 50,
         stretch: 0,
         depth: 100,
         modifier: 1,
         slideShadows: true,
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
       spaceBetween={50}
       slidesPerView={3}
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       onSlideChange={() => console.log('slide change')}
       onSwiper={(swiper) => console.log(swiper)}>
       
       {sliderList && 
             sliderList?.results?.slice(0 , 20)?.map((slide,index)=>(
                <SwiperSlide key={index} className='position-relative'>

                    <SlideCard reqData={slide} direction={direction} />

                </SwiperSlide>
             ))}
       </Swiper>
    </div>
  )
}
