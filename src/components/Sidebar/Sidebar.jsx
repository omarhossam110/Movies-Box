import React from 'react';
import styles from './sidebar.module.css'

export default function Sidebar({sidebarData, changeType}) {
 
  return (
    <>
            <div className={`${styles.sidebar}`}>
            <h4 className="text-center text-light border-botto mt-1 mb-3 pb-3 pt-2">Categories</h4>
                {sidebarData.map((bar,index) => (    
                    <p key={index} id={bar.id}  
                       onClick={()=>changeType(bar.id)} className={`${styles.sidebar_link}`}>
                       {bar.typeName}
                    </p> 
                ))}
            </div>
    </>
  )
}
