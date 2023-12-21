import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ApiContext } from "../../context/ApiContext";

import Loading from "../../components/Loading/Loading";
import ConnectionErr from "../../components/ConnectionErr/ConnectionErr";
import LayoutBox from "../../components/LayoutBox/LayoutBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import HiddenSidebar from "../../components/HiddenSidebar/HiddenSidebar";
import SearchForm from "../../components/SearchForm/SearchForm";
import BackToTop from "../../components/BackToTop/BackToTop";
import styles from "../index.module.css";


export default function Movies() {

  const { isLoading, hasError, movieList, movieType, searchMovie, changeMoviesCategory, changePage }
  = useContext(ApiContext);

  const sidebarData = [
    { id: "popular", typeName: "Popular" },
    { id: "top_rated", typeName: "Top Rated" },
    { id: "upcoming", typeName: "Upcoming" },
    { id: "now_playing", typeName: "Now Playing" },
  ];


  return (
    <>
     <Helmet>
        <title>Movies | MovieBox</title>
     </Helmet>

      <HiddenSidebar
        pageName={"Movies"}
        sidebarData={sidebarData}
        changeType={changeMoviesCategory}
      />

      <section className={styles.section}>
        <div className={styles.navFix}>
          <div className="container">
            <div className="row mt-3 mb-3">
              <div className="col-lg-2 mb-4">
                <Sidebar
                  sidebarData={sidebarData}
                  changeType={changeMoviesCategory}
                />
              </div>

              <div className="col-lg-10">
                <div
                  className={`${styles.movies_section} container text-light rounded-1`}
                >
                  <div className="d-flex justify-content-between">
                    <h2 className={`${styles.section_title}`}>
                      {movieType?.replace("_", " ")} Movies
                    </h2>

                    <SearchForm searchData={searchMovie} />
                  </div>

                  <div className="row mt-3">
                    {isLoading && <Loading />}

                    {hasError && <ConnectionErr/>}

                    {movieList &&
                      movieList?.results?.map((reqMovie, index) => (
                        <LayoutBox key={index} reqData={reqMovie} page='movies' />
                      ))}
                                    
                  </div>
                </div>

                <Pagination paginate={changePage} />
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
      </section>
    </>
  );
}
