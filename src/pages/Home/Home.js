import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Loading from '../../components/Loading/Loading';
import ConnectionErr from '../../components/ConnectionErr/ConnectionErr';
import HomeCard from "./HomeCard";
import HomeIntro from "./HomeIntro";
import BackToTop from "../../components/BackToTop/BackToTop";
import { HomeContext } from "../../context/HomeContext";

import style from "../index.module.css";
// import styles from './Home.module.css';

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

    <section className={`${style.section}`}>
      <div className={style.navFix}>
           <div className="container mt-4 mb-5"> 
         <div className="row">        
           <div className="col-lg-4 d-flex align-items-center mt-5 mb-3">
                 <HomeIntro reqData={introData[0]} />
           </div>

           {isLoading && <Loading />}
           {hasError && <ConnectionErr />}
                 
            {movieList
                && movieList.results?.slice(0,10)?.map((movie, index) => (
                <HomeCard key={index} reqData={movie} direction={'movie'} />)) }  
         </div>
      </div>
      </div>
     

      <div className="container">
         <div className="row border-top">
             <div className="col-lg-4 d-flex align-items-center mt-5 mb-4">
                <HomeIntro reqData={introData[1]} />
              </div>

              {isLoading && <Loading />}
              {hasError && <ConnectionErr />}

              {tvList
                && tvList.results?.slice(0,10)?.map((show, index) => (
                <HomeCard key={index} reqData={show} direction={'tv'} />)) }            
        </div>
      </div>


      <div className="container mb-5">
        <div className="row border-top mt-5">
            <div className="col-lg-4 d-flex align-items-center mt-5">
              <HomeIntro reqData={introData[2]} />
            </div>

            {isLoading && <Loading />}
            {hasError && <ConnectionErr />}

            {personList
                && personList.results?.slice(0 , 10)?.map((person, index) => (
                <HomeCard key={index} reqData={person} direction={'person'} />)) }             
        </div>
      </div>

      <BackToTop />
    </section>   
    </>
  );
}
