import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { postData } from './../../hooks/usePost';
import Joi from 'joi';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash , faEye} from "@fortawesome/free-solid-svg-icons";
import style from '../index.module.css';
import styles from './Registration.module.css';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  // use navigate to redirect the user to some page 
  let navigate = useNavigate();

  const { saveUserToken }= useAuth();

  // base state to collect user data 
  let [user,setUser]=useState(
      {
       first_name:'',
       last_name:'',
       age:0,
       email:'',
       password:'',
       favorites:[]  
      }
    );

  // for show password 
  let [showPass,setShowPass]=useState('password');
  // for api errors
  let [apiError,setApiError] = useState(null);
  // for loading until api response 
  let [isLoading,setIsLoading] = useState(false);
  // for validation errors
  let [validationError,setValidationError]=useState([]);


  // redirect the user to home page if user logged in already
  useEffect(()=>{
      // component mounted
      let loggedInUser = localStorage.getItem('UserInfo');
      if(loggedInUser){
        navigate('/home');
      }
  })
    

  // to get the values from the inputs and setUser 
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
          first_name:Joi.string().min(3).max(10).alphanum().required()
          .pattern(new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]{2,30}$/))
          .messages({
            "string.empty":"First Name is required!",
            "string.min":"Name must be 3 characters at least!"
          }),
          last_name: Joi.string().min(3).max(10).alphanum().required()
          .messages({
            "string.empty":"Last Name is required!",
            "string.min":"Name must be 3 characters at least!"
          }),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required()
          .messages({
            "string.empty":"Email is required!"   
          }),
          password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9-_#@%!]{8,}$/)).required()
          .messages({
            "string.empty":"Password is required!",
            "string.pattern.base":"Password must be at least 8 characters!"
          }),
          age: Joi.number().min(16).max(40).required().messages({
            "number.base":"Age must be a Number!",
            "number.min":"Age must be greater than or equal to 16!"     
          }),
          favorites: Joi.allow(),
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
  async function register(e){
        e.preventDefault();
        // if the validation function is returning true
        if(validateRegister()===true){
         
          setIsLoading(true);
          // sending new user data to backend 
          let response = await postData(`https://movies-app-backend-1fxl.onrender.com/users`,user);
          console.log(response.data);
          console.log(response.status);
          
          // if the data successfully sent to the backend
          if(response.status === 201){
            setApiError(null);
            setIsLoading(false);
            console.log('Signed Up!!');
            // to keep user logged in in we must save some of his info into the local storage ( Token )
            localStorage.setItem('UserInfo',JSON.stringify(response.data));
            // we save the user data token to App component so we can use it in the rest of components
            saveUserToken();
            // redirect user to login page
            navigate('/login');
          }else{
            // error in the api connection
            setApiError(response.status);
            setIsLoading(false);
          }

        }
  }

  return (
    <>
     <Helmet>
        <title>SignUp | MovieBox</title>
     </Helmet>
    <section className={style.section}>
      <div className={style.navFix}>
         <div className="container">
        <div className={styles.section}>
            <div className={`${styles.form_container}`}>

                <h2 className="mb-3">Make Account!</h2>
                {apiError && <div className='alert alert-danger'>{apiError}</div>}
                <form onSubmit={(e)=>register(e)}>
                   
                    <div className={styles.inputBox}>
                        <input onChange={(e)=>getUserData(e)} type="text" id='first_name' name='first_name'/>
                        <label htmlFor="first_name">First Name</label>
                    </div>
                        {validationError.filter(error => error.context.label === "first_name")[0]?.message}

                    <div className={styles.inputBox}>
                        <input onChange={(e)=>getUserData(e)}  type="text" id='last_name' name='last_name'/>
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                        {validationError.filter(error => error.context.label === "last_name")[0]?.message}

                    <div className={styles.inputBox}>
                        <input onChange={(e)=>getUserData(e)}  type="email" id='email' name='email'/>
                        <label htmlFor="email">Email</label>
                    </div>
                        {validationError.filter(error => error.context.label === "email")[0]?.message}

                    <div className={styles.inputBox}>
        
                          <input onChange={(e)=>getUserData(e)}  type={showPass} id='password' name='password'/>
                        <label htmlFor="password">Password</label>
    
                            {showPass === 'password' ? 
                               <FontAwesomeIcon onClick={()=>showPassword('text')} icon={faEye} className={`${styles.showPass}`}/>
                             : <FontAwesomeIcon onClick={()=>showPassword('password')} icon={faEyeSlash} className={`${styles.showPass}`}/> }
                                      
                    </div>
                        {validationError.filter(error => error.context.label === "password")[0]?.message}

                    <div className={styles.inputBox}>
                        <input onChange={(e)=>getUserData(e)}  type="number" id='age' name='age'/>
                        <label htmlFor="age">Age</label>
                    </div>
                        {validationError.filter(error => error.context.label === "age")[0]?.message}

                    <button className={styles.formButton}>
                      {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Sign Up"}
                    </button>

                    <div className={styles.paragraph}>
                      <p>Already Registered? <Link to="/login">Login!</Link></p>
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