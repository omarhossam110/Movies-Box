import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';

import LayoutBox from './../../components/LayoutBox/LayoutBox';
import style from '../index.module.css';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const {userToken}=useAuth();
  let userData = JSON.parse(userToken);
  return (
  <>
   <Helmet>
        <title>{userData.first_name}'s profile | MovieBox</title>
     </Helmet>
   <section className={style.section} style={{height:'100lvh'}}>
      <div className={style.navFix}>
        <div className="container">
          <div className="row">

            <div className={`${styles.Container} px-1 mt-3`}>
              <div className="p-3">

                <div className={`${style.section_title} ${styles.Header}`}>         
                      <div className="d-flex">
                       <div className="d-flex align-items-end">
                         <div className={`${styles.Box} mb-2`}>
                             <h1 className="text-center primary-text mt-2">P</h1>
                          </div>
                        </div>   
                        <div className="d-flex align-items-end">
                           <h2 className='' >{userData?.first_name + ' ' + userData?.last_name}</h2>     
                        </div>
                      </div>                    
                </div>

                <div className={`${styles.Description} px-4 pb-1 pa-m-0 mt-m-0 mt-m-0`}>
                    <div className="brand-heading mt-4 mb-2">
                        <h3 className="primary-text fs-5 fw-bold">Profile Details</h3>
                        <div className="mt-3 ms-1">
                          <p>Email: &nbsp;{userData?.email}</p>
                           <p>Age:  &nbsp;{userData?.age}</p>
                        </div>
                    </div>
                </div>

                <div className="brand-best-dishes mt-4">
                <h3 className="primary-text fs-5 fw-bold">Your Favorites:</h3>

                    <div class="container">
                        <div className="row">

                          <div className="col-lg-10 offset-lg-1 offset-sm-1">
                            <div className="row">
                              {userData &&
                                  userData?.favorites?.map((reqMovie, index) => (
                                  <LayoutBox key={index} reqData={reqMovie} userToken={userToken} page='profile' />
                               ))}
                            </div> 
                          </div>
               
                       </div>
                    </div>
                    
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
   </section>   
  </>
  )
}
