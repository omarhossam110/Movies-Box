import React,{ useEffect,useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
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
      <Navbar collapseonselect expanded={expanded} expand="lg"
        className={`${styles.model} ${scrollDown? styles.modelMove:null} navbar-expand-lg navbar-dark`}>   
        <Container>

          <Link className="navbar-brand" to="">
           <h2>MoviesBox</h2>
          </Link>

          <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" 
              className={`${styles.collapse} ${scrollDown? styles.collapseColor:null}`}>
                  
             {userToken ? 
               <>
                 <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Nav.Link eventkey="1" as={Link} className="nav-link text-center" to="">
                      Home
                    </Nav.Link>
                  </li>
                  <li className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className="nav-link text-center" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className="nav-link text-center" to="tv-shows">
                      Tv Shows
                    </Link>
                  </li>
                  <li className={`nav-item p-2 ${styles.navbar_link} ${scrollDown? styles.navbarCollapseColor:null}`}>
                    <Link className="nav-link text-center" to="actors&directors">
                      Actors/Directors
                    </Link>
                  </li>
                 </ul>

                 <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  <li className="nav-item d-flex align-items-center m-md-auto m-sm-auto">
                    <p className="mb-lg-0 me-lg-3">Welcome &nbsp;
                      <Link to='/profile' className={styles.profile_link}>
                         {JSON.parse(userToken).first_name.toUpperCase()}
                      </Link>
                    </p>
                  </li>
                  <li className="nav-item p-2">
                    <button className="btn btn-light d-flex m-md-auto m-sm-auto" onClick={logOut}>
                      Logout
                    </button>
                  </li>
                 </ul> 
               </>
           
              :
        
               <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
               <li className="nav-item">
                  <Link className="nav-link" to="register">
                     Sign Up
                  </Link>
                </li>
               <li className="nav-item">
                  <Link className="nav-link" to="login">
                     Login
                  </Link>
                </li>
               </ul>
              }
             
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
