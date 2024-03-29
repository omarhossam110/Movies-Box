import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Loading from '../../components/Loading/Loading';
import ConnectionErr from '../../components/ConnectionErr/ConnectionErr';
import HomeCard from "./HomeCard";
import HomeIntro from "./HomeIntro";
import BackToTop from "../../components/BackToTop/BackToTop";
import { HomeContext } from "../../context/HomeContext";
import Slider from "../../components/Slider/Slider";

import style from "../index.module.css";
import styles from './Home.module.css';

export default function Home() {

  const  { isLoading, hasError, movieList, tvList, personList }  = useContext(HomeContext);


  const introData = [
   {
    header:"Trending Movies To Watch",
    paragraph:"Discover All the Popular Movies Available Now!"
   },
   {
    header:"Trending Tv Shows To Watch",
    paragraph:"Discover All the Popular Shows Available Now!"
   },
   {
    header:"Trending Actors/Directors",
    paragraph:"Discover All the Popular Actors and Directors Now!"
   }
  ]
  
  return (
    <>   
     <Helmet>
        <title>Home | MovieBox</title>
     </Helmet>

    <section className="d-md-flex justify-content-center align-items-center d-lg-relative">
      <div className={style.navFix}>

        {/* <div className="container">
           <Slider movieList={movieList} tvList={tvList} personList={personList} />
        </div> */}


    <div className={`${styles.containerFluid}`}>
     <div className="container"> 
         <div className="row">        
           <div className="col-lg-4 col-sm-12 d-flex align-items-center mt-5 mb-5">
                 <HomeIntro reqData={introData[0]} />
           </div>

           {isLoading && <Loading />}
           {hasError && <ConnectionErr />}

            {movieList
                && movieList.results?.slice(0,10)?.map((movie, index) => (
                <HomeCard key={index} reqData={movie} direction={'movie'} />)) }  
                
             <Slider sliderList={movieList} direction={'movie'}/>    
         </div>
        </div>
     
        <div className="container mt-5">
         <div className="row pt-5 border-top">
             <div className="col-lg-4 d-flex align-items-center mt-5 mb-5">
                <HomeIntro reqData={introData[1]} />
              </div>

              {isLoading && <Loading />}
              {hasError && <ConnectionErr />}

              {tvList
                && tvList.results?.slice(0,10)?.map((show, index) => (
                <HomeCard key={index} reqData={show} direction={'tv'} />)) }  

              <Slider sliderList={tvList} direction={'tv'}/>              
        </div>
        </div>

        <div className="container mb-5">
        <div className="row border-top mt-5 pt-5">
            <div className="col-lg-4 d-flex align-items-center mt-5 mb-5">
              <HomeIntro reqData={introData[2]} />
            </div>

            {isLoading && <Loading />}
            {hasError && <ConnectionErr />}

            {personList
                && personList.results?.slice(0 , 10)?.map((person, index) => (
                <HomeCard key={index} reqData={person} direction={'person'} />)) }   

            <Slider sliderList={personList} direction={'person'}/>            
        </div>
        </div>

     </div>
      

        <BackToTop />
      </div>
    </section>   
    </>
  );
}
