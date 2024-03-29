import React,{ useEffect,useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';

import styles from "./Navbar.module.css"
import { useAuth } from '../../context/AuthContext';
import { Nav } from 'react-bootstrap';

export default function NavBar(){
  let navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const {userToken,setUserToken} = useAuth();
 
  // to logout we remove the user token
  function logOut(){
    setUserToken(null);
    localStorage.removeItem('UserInfo');
    navigate('/login');
  }
 

  // to ably animation when scroll
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
      <Navbar collapseOnSelect expanded={expanded} expand="lg"
        className={`${styles.model} ${scrollDown? styles.modelMove:null} navbar-dark`}>   
        <div className={styles.containerFluid}>

          <Link className="navbar-brand" to="">
           <h2 className={styles.brand}>MoviesBox</h2>
          </Link>

          <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} 
          className={styles.optionsIcon} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" 
              className={`${styles.collapse} ${scrollDown? styles.collapseColor:null}`}>
                  
             {userToken ? 
               <>
                 <Nav className="navbar-nav mb-5 mb-lg-0">
                  <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}
                  className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className={`${styles.nav_a} text-center`} to="">
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link  onClick={() => setExpanded(expanded ? false : "expanded")}
                  className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className={`${styles.nav_a} text-center`} to="movies">
                      Movies
                    </Link>
                  </Nav.Link>
                  <Nav.Link  onClick={() => setExpanded(expanded ? false : "expanded")}
                  className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className={`${styles.nav_a} text-center`} to="tv-shows">
                      Tv Shows
                    </Link>
                  </Nav.Link>
                  <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}
                  className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className={`${styles.nav_a} text-center`} to="actors&directors">
                      Actors/Directors
                    </Link>
                  </Nav.Link>
                 </Nav>

                 <Nav className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  <Nav.Link className="nav-item d-flex align-items-center m-md-auto m-sm-auto">
                    <p className={`${styles.userName} mb-lg-0 me-lg-3 mb-5`}>
                      <Link onClick={() => setExpanded(expanded ? false : "expanded")}
                       to='/profile' className={styles.profile_link}>
                         {JSON.parse(userToken).first_name.toUpperCase()}&nbsp;
                         {JSON.parse(userToken).last_name.toUpperCase()}
                      </Link>
                    </p>
                  </Nav.Link>
                  <Nav.Link className="nav-item p-2 mt-4 m-lg-0">
                    <button className={`${styles.logOut} btn btn-light d-flex m-md-auto m-sm-auto mb-md-5 mb-lg-0`} 
                            onClick={()=>{
                              logOut();
                              setExpanded(expanded ? false : "expanded");
                              }}>
                      Logout
                    </button>
                  </Nav.Link>
                 </Nav> 
               </>
           
              :
        
               <Nav className="navbar-nav mb-2 mb-lg-0 ms-auto">
                 <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}
                 className="nav-item">
                  <Link className="nav-link" to="register">
                     Sign Up
                  </Link>
                 </Nav.Link>
                 <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}
                 className="nav-item">
                  <Link className="nav-link" to="login">
                     Login
                  </Link>
                 </Nav.Link>
               </Nav>
              }
             
        </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
