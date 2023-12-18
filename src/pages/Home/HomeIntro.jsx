import React from 'react';
import styles from './Home.module.css';

export default function HomeIntro(props) {
    let introData = props.reqData;
  return (
    <> 
        <div className={`${styles.home_section_intro}`}>
            <h4>{introData.header}</h4>
            <p class="w-75">{introData.paragraph}</p>
        </div>
    </>
  )
}
