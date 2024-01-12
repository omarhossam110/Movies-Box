import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import styles from './Slider.module.css';

export default function SlideCard({reqData,direction}) {
    let data = reqData;
    let media = direction;
  return (
    <>
     <Link to={`/${media}Details/${media}/${data.id}`} className="text-decoration-none text-light">
              <div className={`content border rounded border-light text-light`}>
                  <div className={`${styles.imgLayer}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path ||  data.profile_path}`} 
                                     alt={data.name || data.title} className='w-100 rounded' />
                    <div className={`${styles.overLayer} rounded`}>
                      <h6 className=' mt-2'>{data.title || data.name}</h6>
                                      
                      {data.vote_average?
                        <p className='badge p-2 bg-success'>
                            <FontAwesomeIcon icon={faStar} className="me-1" />
                            {data.vote_average.toFixed(2)}
                        </p> : null
                      }
                                      
                      {data.known_for_department? <h6 class=" mt-2">{data.known_for_department}</h6> :null }

                    </div>
                  </div>
              </div>
              {/* <h5 className={`${styles.cardTitle} text-center mt-2 mb-5`}>{data.title || data.name}</h5> */}
          </Link>
    </>
  )
}
