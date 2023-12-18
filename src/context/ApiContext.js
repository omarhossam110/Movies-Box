import { createContext, useState, useEffect } from "react";
import { fetchData } from "../hooks/useFetch";

export const ApiContext = createContext();

export function ApiContextProvider(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(null);

    const [movieList, setMovieList] = useState(null);
    const [tvList, setTvList] = useState([]);
    const [personList, setPersonList] = useState(null);

    const [movieType, setMovieType] = useState('popular');
    const [tvType, setTvType] = useState("trending");

    const [currentPage, setCurrentPage] = useState(1);


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

// {------------------------------ CHANGE DATA ( COMPONENT CHANGE ) --------------------------------------}
  
  // IF THE MOVIE TYPE/PAGE CHANGED
  useEffect(() => {
      fetchData(
        `https://api.themoviedb.org/3/movie/${movieType}?api_key=49ea3e647595c27aeee320828b312c40&page=${currentPage}`
      ).then((res) => {setMovieList(res.data);setIsLoading(false);})
       .catch((error) => {setHasError(error); setIsLoading(false);})
    }, [movieType, currentPage]);

  // CHANGE MOVIE CATEGORY
  function changeMoviesCategory(newCategory) {
    setMovieType(newCategory);
  }


  // IF THE TV TYPE/PAGE CHANGED
  useEffect(() => {
    if (tvType !== "trending") {
      fetchData(
        `https://api.themoviedb.org/3/tv/${tvType}?api_key=49ea3e647595c27aeee320828b312c40&page=${currentPage}`
      ).then((res) => setTvList(res.data));
    } else {
      fetchData(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=49ea3e647595c27aeee320828b312c40&page=${currentPage}`
      ).then((res) => setTvList(res.data));
    }
  }, [tvType, currentPage]);

  // CHANGE TV CATEGORY
  function changeTvShowsCategory(newCategory) {
    setTvType(newCategory);
  }


  // IF THE PERSON PAGE CHANGED
  useEffect(() => {
    fetchData(
      `https://api.themoviedb.org/3/trending/person/day?api_key=49ea3e647595c27aeee320828b312c40&page=${currentPage}`
    ).then((res) => {setPersonList(res.data); setIsLoading(false);})
      .catch((error) => {setHasError(error); setIsLoading(false);});
  }, [currentPage]);


  // CHANGE PAGE FOR ALL MOVIES/TV SHOWS/PERSONS
  function changePage(pageNumber) {
    setCurrentPage(pageNumber);
  }


  // SEARCH FOR MOVIES
  const searchMovie = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.value;

    if (searchQuery !== "") {
      console.log("searching..");
      const url = `https://api.themoviedb.org/3/search/movie?api_key=49ea3e647595c27aeee320828b312c40&query=${searchQuery}`;
      fetchData(url).then((res) => setMovieList(res.data));
    } else {
      fetchData(
        `https://api.themoviedb.org/3/movie/${movieType}?api_key=49ea3e647595c27aeee320828b312c40`
      ).then((res) => setMovieList(res.data));
    }
  };


   // SEARCH FOR TV SHOWS
   const searchTvShow = async (e) => {
    e.preventDefault();
    let searchQuery = e.target.value;
    if (searchQuery !== "") {
      console.log("searching..");
      const url = `https://api.themoviedb.org/3/search/tv?api_key=49ea3e647595c27aeee320828b312c40&query=${searchQuery}`;
      fetchData(url).then((res) => setTvList(res.data));
    } else {
      fetchData(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=49ea3e647595c27aeee320828b312c40`
      ).then((res) => setTvList(res.data));
    }
  };


  // SEARCH FOR PERSON
  const searchPerson = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.value;

    if (searchQuery !== "") {
      console.log("searching..");
      const url = `https://api.themoviedb.org/3/search/person?api_key=49ea3e647595c27aeee320828b312c40&query=${searchQuery}`;
      fetchData(url).then((res) => setPersonList(res.data));
    } else {
      fetchData(
        `https://api.themoviedb.org/3/trending/person/day?api_key=49ea3e647595c27aeee320828b312c40`
      ).then((res) => setPersonList(res.data));
    }
  };



   return (
    <ApiContext.Provider
    value={{
               isLoading,
               hasError,
               movieList,
               tvList,
               personList,
               movieType,
               tvType,
               currentPage,
               changeMoviesCategory,
               changeTvShowsCategory,
               changePage,
               searchMovie,
               searchTvShow,
               searchPerson,
            }}
    
    >
      {props.children}
    </ApiContext.Provider>
   )
}