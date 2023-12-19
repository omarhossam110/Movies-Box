import React ,{ createContext, useState, useEffect, useContext } from "react";
import { fetchData } from "../hooks/useFetch";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

// to protect the component and make sure the user can't access
// them unless he's registered user   
export function ProtectedRoute(props){
  // we check on the token
  if(localStorage.getItem("UserInfo")!== null){
    // go to the child component we are passing 
    return (props.children);
  } else {
    // the user not registered, so redirect to login component  
    return <Navigate to='/login' />
  }
}

 
export function AuthContextProvider(props) {

  const [allUsers,setAllUsers]= useState(null)
  const [authUser,setAuthUser]=useState(null);
  const [isLoggedIn,setIsLoggedIn]=useState(false);


  useEffect(()=>{
      fetchData(`https://movies-app-backend-1fxl.onrender.com/users`)
      .then((res)=>{
        // console.log(res.data)
        setAllUsers(res.data)
      })
  },[])
   

  // check if user logged in already set user token 
  let loggedInUser = localStorage.getItem('UserInfo');
  let [userToken,setUserToken]=useState(loggedInUser);


  // to represent the user data in the website we must save it here,
  // so all the components can see it.  
  function saveUserToken(){
    // we get the user here from Login component   
    let token = localStorage.getItem('UserInfo');
    // here we use jwt_decode to resolve the token
    // jwt_decode(token) => decoded token
     setUserToken(token);
     console.log('from authContext', userToken);
  }

  
  return ( 
    <AuthContext.Provider
       value={{
        allUsers,
        authUser,
        setAuthUser,
        setUserToken,
        isLoggedIn,
        setIsLoggedIn,
        userToken,
        saveUserToken,
      }}
    >
        {props.children}
    </AuthContext.Provider>
    )
}

