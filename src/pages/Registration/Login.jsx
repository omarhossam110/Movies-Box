import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import Joi from 'joi';

import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/AuthContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash , faEye} from "@fortawesome/free-solid-svg-icons";
import style from '../index.module.css';
import styles from './Registration.module.css';

export default function Login() {
  let navigate = useNavigate();

  const { saveUserToken }= useAuth();
  
  // redirect the user to home page if user logged in already
  useEffect(()=>{
    // component mounted
    let loggedInUser = localStorage.getItem('UserInfo');
    if(loggedInUser){
      navigate('/home');
    }
  })

  // base state to collect user data 
    let [user,setUser]=useState(
        {
            email:'',
            password:''    
        }
    );

    // for show password 
    let [showPass,setShowPass]=useState('password')
    // for api errors
    let [apiError,setApiError] = useState(null);
    // for loading until api response 
    let [isLoading,setIsLoading] = useState(false);
    // for validation errors
    let [validationError,setValidationError]=useState([]);
 

    // to get the data values from the inputs  
    function getUserData(e){
        // console.log(e.target.name);
       let currentUser = {...user};
       currentUser[e.target.name] = e.target.value;
       setUser(currentUser);
    }

    // to show or hide the password
    function showPassword(option){
      setShowPass(option);
   }

    // to validate the returned data by JOI package 
    function validateRegister(){
      let schema = Joi.object(
        {
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
          password: Joi.string().required()
        }
      )
      
      // to show if more than input error we set abortEarly to false
      let validations = schema.validate(user,{abortEarly:false});
      // console.log(validations);

      // to set the return of the validation function based on if there is an error 
      if(validations.error){
        setValidationError(validations.error.details);
        return false;
      }else{
        return true;
      }
    }


    // to submit the user data and send it to the backend server
    async function userLogin(e){
        e.preventDefault();
        // if the validation function is returning true
        if(validateRegister()===true){
         
          setIsLoading(true);
          // sending data to backend 
          let response = 
          await axios.get(`https://movies-app-backend-1fxl.onrender.com/users?email=${user.email}&password=${user.password}`);
          // console.log(response.data);
          
          // if the data successfully sent to the backend
          if(response.status === 200 && response.data.length > 0){
            setApiError(null);
            setIsLoading(false);
            console.log('Logged In!!');
            // to keep user logged in in we must save some of his info into the local storage ( Token )
            localStorage.setItem('UserInfo',JSON.stringify(response.data[0]));
            // we save the user data token to App component so we can use it in the rest of components
            saveUserToken();
            // redirect user to home page
            navigate('/home');
             
          }else{
            // error in the api connection
            setApiError("Something is Error with ether the Email or Password!");
            setIsLoading(false);
          }

        }
    }

  return (
    <>
     <Helmet>
        <title>Login | MovieBox</title>
     </Helmet>

    <section className={style.section}>
      <div className={style.navFix}>
        <div className="container">
         <div className="d-flex align-items-center justify-content-center" style={{height:'100lvh'}}>
            <div className={`${styles.form_container}`}>
            
                <h2 className="">Login Now!</h2>
                {apiError && <div className='alert alert-danger'>{apiError}</div>}
                <form onSubmit={(e)=>userLogin(e)}>

                    <div className={`${styles.inputBox}`}>
                        <input onChange={(e)=>getUserData(e)}  type="text" id='email' name='email' />
                        <label htmlFor="email">Email</label>
                    </div>
                    {validationError.filter(error => error.context.label === "email")[0]?.message}

                    <div className={styles.inputBox}>                       
                        <input onChange={(e)=>getUserData(e)}  type={showPass} id='password' name='password'/>
                          <label htmlFor="password">Password</label>

                          {showPass === 'password' ? 
                               <FontAwesomeIcon onClick={()=>showPassword('type')} icon={faEye} className={`${styles.showPass}`}/>
                             : <FontAwesomeIcon onClick={()=>showPassword('password')} icon={faEyeSlash} className={`${styles.showPass}`}/> }
                     </div>
                        {validationError.filter(error => error.context.label === "password")[0]?.message}

                    <button className={styles.formButton}>
                      {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
                    </button>

                    <div class={styles.paragraph}>
                      <p>Don't have a account? <Link to='/register'>Register</Link></p>
                    </div>
                </form>

            </div>
          </div>
        </div>
      </div> 
  </section>
    </>
  )
}
