import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addToFav } from "../../utility/addToFav";
import { removeFav } from "../../utility/removeFav";
import { Modal, Button} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./LayoutBox.module.css";


export default function LayoutBox({reqData,page}) {
    
  let data = reqData;

  const {userToken,saveUserToken}=useAuth();
  
  let userData = JSON.parse(userToken);
  let userFavorites = userData.favorites;

  const [showPopUp, setShowPopUp] = useState(false);
  const handleMorePopUp = () => setShowPopUp(true);
  const handleClosePopUp = () => setShowPopUp(false);

  const addedNotify = ()=>{
    toast.success('Added Successfully!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const removeNotify = ()=>{
    toast.error('Removed Successfully!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  return (
    <>
      <div className="col-lg-3">
        <div className={`card ${styles.LayoutBox} mb-2 mt-2`}>
         
        <div className={`${styles.imgLayer}`}>
          {/* Movies / TV / Person APIs */}
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path ||  data.profile_path}`}
             className="card-img-top"
             alt={`${data.name || data.title}`}
          />

          <div className={`${styles.overLayer} rounded`}>
              <h6 class=" mt-2">{data.title || data.name}</h6>
              
              {/* Movies / TV  APIs */}
              {data.vote_average ? 
                <p className="badge p-2 bg-success">
                  <FontAwesomeIcon icon={faStar} className="me-1"/> 
                    {data.vote_average.toFixed(1)}
                  </p>  : null}
              
              {/* Person  API */}
              {data.known_for_department? <h6 class=" mt-2">{data.known_for_department}</h6> :null }

          </div>
        </div>
        

          

          <div className="card-body">
            <h5 className={`${styles.boxTitle} mb-2`}>
              {/* Movies / TV / Person APIs */}
              {data.title || data.name}
            </h5>

            {/* Movies API */}
            { data.release_date?
                 <h5 className={`${styles.boxDate} mb-3`}>Date of Release: {data.release_date}</h5> : null}
           
            {/* TV API */}
            { data.first_air_date?
                 <h5 className={`${styles.boxDate} mb-3`}>First Air Date: {data.first_air_date} </h5> : null }

           
             <div className="d-flex justify-content-center mt-2">
             <Button className={`btn btn-light w-100`} onClick={handleMorePopUp}>
               More..
             </Button>
           </div> 


           <div className="d-flex justify-content-center mt-2"> 

           { userFavorites?.find((fav)=> data.id === fav.id) ?
             
             <Button className={`btn btn-danger w-100`}  onClick={()=>{
                 removeFav(userToken,data,saveUserToken); 
                 removeNotify();    
                 }}> Remove Favorite
              </Button> 
             
             :                           
             
              <Button className={`btn btn-success w-100`} onClick={()=>{
                addToFav(userToken,data,saveUserToken);
                addedNotify()   
              }}>
                Add to Favorites
              </Button> 
              
              }

              <ToastContainer position="top-left"
                              autoClose={1000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light" />      
           </div>


            <Modal show={showPopUp} onHide={handleClosePopUp}>
              <Modal.Header className={styles.popUp} closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>

              <Modal.Body className={styles.popUp}>
                <div className="d-flex justify-content-center mb-3">
                  {/* Movies / TV / Person APIs */} 
                  <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path ||  data.profile_path}`}
                      style={{width: "14rem"}}
                      alt="..."
                    />
                </div>

                <div className="text-center">

                  {/* Movies / TV / Person APIs */}
                  <h3>{data.title || data.name}</h3>
                  
                  {/* Movies / TV  APIs */}
                  {data.vote_average ? <h4>IMDb: {data.vote_average.toFixed(1)}</h4> : null}

                  {/* Movies API */}
                  {data.release_date ? <h5>Date of Release: {data.release_date}</h5> : null}

                  {/* TV API */}
                  {data.first_air_date ? <h5>First Air Date: {data.first_air_date}</h5> : null}
                  
                  {/* Person API */}
                  {data.known_for_department ? <h4>Department: {data.known_for_department}</h4> :null}

                  {/* Person API */}
                  {data.popularity ? <h5>Popularity: {data.popularity.toFixed(1)}</h5> :null}
                  
                </div>

                <p>{data.overview}</p>
              </Modal.Body>

              <Modal.Footer className={styles.popUp}>
                <Button variant="secondary" onClick={handleClosePopUp}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

          </div>

        </div>
      </div>
    </>
  );
}