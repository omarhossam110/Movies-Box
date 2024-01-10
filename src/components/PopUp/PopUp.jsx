import React from 'react';

import styles from './popup.module.css';

export default function PopUp({id}) {
  return (
    <>
       <div class={styles.popup} id={id}>
            <div class={styles.popup__content}>
                <div class={styles.popup__left}>
                  {/* <img src="img/nat-8.jpg" alt="Tour Photo" class="popup__img"> */}
                  {/* <img src="img/nat-9.jpg" alt="Tour Photo" class="popup__img"> */}
                </div>
                <div class={styles.popup__right}>
                    <h2 class={`heading-scondary mb-4`}>Start Booking Now!</h2>
                    <a href="#section-tours" class={styles.popup__close}>&times;</a>
                   <h3 class={`heading-tertiary mb-4`}>Important &ndash; Please Read Thoese Terms Before Booking</h3>
                   <p class={styles.popup__text}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil libero optio 
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil libero optio 
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil libero optio 
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil libero optio   
                   </p>
                   {/* <a href="#" class="btn btn--green">Book Now!</a> */}
                </div>
            </div>
        </div>
    </>
  )
}
