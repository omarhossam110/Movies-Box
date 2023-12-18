import { createContext, useState, useEffect } from "react";
import { fetchData } from "../hooks/useFetch";

export const HomeContext = createContext();

export function HomeContextProvider(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(null);

    const [movieList, setMovieList] = useState(null);
    const [tvList, setTvList] = useState([]);
    const [personList, setPersonList] = useState(null);

// {------------------------------ RETRIEVE DATA ( COMPONENT MOUNTED ) --------------------------------------}
useEffect(()=>{
    // Movies API
    fetchData(
      `https://api.themoviedb.org/3/movie/popular?api_key=49ea3e647595c27aeee320828b312c40`
    )
      .then((res) => {
        // console.log(res.data);
        setMovieList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error)
        setIsLoading(false);
      });

    // TV Shows APi
      fetchData(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=49ea3e647595c27aeee320828b312c40`
      )
        .then((res) => {
          setTvList(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setHasError(error)
          setIsLoading(false);
        });

      // Person API
      fetchData(
        `https://api.themoviedb.org/3/trending/person/day?api_key=49ea3e647595c27aeee320828b312c40`
      )
        .then((res) => {
          setPersonList(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setHasError(error);
          setIsLoading(false);
        });

  },[]);

// {------------------------------------------------------------------------------------------------------}

return (
    <HomeContext.Provider
    value={{
               isLoading,
               hasError,
               movieList,
               tvList,
               personList
            }}
    
    >
      {props.children}
    </HomeContext.Provider>
   )
}