import React, { useEffect, useState } from "react";
// import {ReactChildren as ToTopBtn } from "../../assets/noun-back-to-top-4146496.svg";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopBtn(true);
      } else {
        setBackToTopBtn(false);
      }
    });
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      {backToTopBtn && (
        <svg
          className={styles.Btn}
          onClick={scrollTop}
          fill="#fff"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 90 112.5"
          enable-background="new 0 0 90 90"
        >
          <path d="M45.006,24.052c0.713-0.025,1.416,0.219,1.943,0.744l16.26,16.277c1.135,1.139,1.203,2.9,0.15,3.953l-2.416,2.42  c-1.053,1.053-2.813,0.984-3.947-0.15l-6.793-6.799v24.525c0,1.381-1.025,2.486-2.301,2.486h-5.703  c-1.277,0-2.309-1.105-2.309-2.486V40.497l-6.785,6.799c-1.141,1.135-2.902,1.203-3.953,0.15l-2.418-2.42  c-1.051-1.053-0.979-2.814,0.156-3.953l16.105-16.125C43.563,24.38,44.293,24.077,45.006,24.052z M45.047,9.854  c-9.516,0-18.645,3.785-25.375,10.521c-6.729,6.74-10.51,15.875-10.51,25.408c0,9.523,3.781,18.664,10.51,25.4  c6.73,6.736,15.859,10.521,25.375,10.521c9.521,0,18.646-3.785,25.375-10.521c6.73-6.736,10.512-15.877,10.512-25.4  c0-9.533-3.781-18.668-10.512-25.408C63.693,13.64,54.568,9.854,45.047,9.854z" />
        </svg>
      )}
    </>
  );
}
// how to make back to top btn ?
