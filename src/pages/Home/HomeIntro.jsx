import React from 'react';
import styles from './Home.module.css';

export default function HomeIntro(props) {
    let introData = props.reqData;
  return (
    <> 
        <div className={`${styles.home_section_intro}`}>
            <h2>{introData.header}</h2>
            <h3 class="w-75">{introData.paragraph}</h3>
        </div>
    </>
  )
}
