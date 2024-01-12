import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

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
       spaceBetween={50}
       slidesPerView={3}
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
