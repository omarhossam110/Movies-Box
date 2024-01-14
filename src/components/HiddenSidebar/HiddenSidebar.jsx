import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./HSb.module.css";

export default function HiddenSidebar({ pageName ,sidebarData, changeType }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [scrollDown, setScrollDown] = useState(false);
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setScrollDown(true);
            } else {
                setScrollDown(false);
            }
    })
  },[])

  return (
    <>
      <button
        variant="primary"
        onClick={toggleShow}
        className={`${styles.HiddenSidebar}`}
      >
        Categories
        <span className="d-flex align-items-center justify-content-center mt-3">
        <FontAwesomeIcon icon={faList} className={`${styles.optionsIcon}`} />

        </span>
      </button>
      <Offcanvas show={show} onHide={handleClose} className={`bg-black ${scrollDown? styles.canvasColor:null}`}>

        <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-center ">
          <Offcanvas.Title className="text-light mb-4" style={{fontSize:'4.1rem'}}>{pageName} Categories</Offcanvas.Title>
          <div className={`${styles.sidebar}`}>
            {sidebarData.map((bar, index) => (
              <p key={index} id={bar.id} onClick={() => changeType(bar.id)}
               className={`${styles.sidebar_link} ${scrollDown? styles.sidebarCanvasColor:null}`}>
                {bar.typeName}
              </p>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
