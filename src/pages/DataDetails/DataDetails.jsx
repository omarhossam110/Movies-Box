import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import style from "../index.module.css";
import styles from './DataDetails.module.css'
import { Helmet } from "react-helmet";

export default function DataDetails() {
  
  // this id is the parameter that we sent as parameter in the nested route "x" in app.js
  let { media, id } = useParams();

  // to set the data from the api (data details)
  const [dataDetails, setDataDetails] = useState(null);

  async function getDataDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=052025105fb6aa8c62f1ebfce9cbbd40&language=en-US`
    );
    setDataDetails(data);
  }

  useEffect(() => {
    getDataDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
   <>
    <Helmet>
        <title>{`${dataDetails?.title || dataDetails?.name} | MovieBox`}</title>
     </Helmet>
   <section className={style.section}>
      <div className={style.navFix}>
            {dataDetails ? (

          <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{height:'100lvh'}}>
                         <div className="me-3" style={{width:'33%'}}>
                           <img className="card w-100 rounded" alt={dataDetails.name || dataDetails.title}
                            src={`https://image.tmdb.org/t/p/w500/${dataDetails.poster_path ||  dataDetails.profile_path}`}/>
                         </div>                   
                         
                <div className={`${styles.data_container}`}>
                      <div className={`${styles.contentDetails}`}>
                        <div>
                          {/* Movies / TV / Person APIs */}
                          <h2>{dataDetails.original_title || dataDetails.name}</h2>
                          <p>{dataDetails.tagline}</p>
                          
                          {/* Movies / TV  APIs */}
                          {dataDetails.genres?.map((genre, idx) => (
                            <span key={idx} className="bg-light text-dark me-3  p-1 rounded">
                              {genre.name}
                            </span>
                          ))}

                          {/* Movies / TV  APIs */}
                          {dataDetails.vote_count? <h5 className="mt-3">Vote Count: {dataDetails.vote_count}</h5>
                            :null}

                          {dataDetails.popularity? <h5 className="mt-3">Popularity: {dataDetails.popularity}</h5>
                            :null}     
                          
                          {/* Movies API */}
                          {dataDetails.release_date? <h5 className="mt-3">Release Date: {dataDetails.release_date}</h5>
                            :null}

                          {/* TV API */}
                          {dataDetails.first_air_date? <h5>First Air Date: {dataDetails.first_air_date}</h5>
                            :null}
                            
                          {/* Person API */}
                          {dataDetails.known_for_department? <h5>Department: {dataDetails.known_for_department}</h5>
                            :null}
                          
                          {/* Movies / TV  APIs */}
                          <p className="mt-3">{dataDetails.overview}</p>
                        </div>
                      </div>
                 
                </div>
              </div>
          </div>


            
          ) : (
            // if the data didn't rendered yet, set the loading screen
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-spin fa-spinner fa-5x"></i>
            </div>
          )}
      </div> 
    </section>
   </> 
    
  );
}
