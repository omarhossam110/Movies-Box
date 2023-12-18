import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ApiContext } from "../../context/ApiContext";

import LayoutBox from "../../components/LayoutBox/LayoutBox";
import Loading from "../../components/Loading/Loading";
import ConnectionErr from "../../components/ConnectionErr/ConnectionErr";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import HiddenSidebar from "../../components/HiddenSidebar/HiddenSidebar";
import SearchForm from "../../components/SearchForm/SearchForm";
import BackToTop from "../../components/BackToTop/BackToTop";
import styles from "../index.module.css";

export default function TvShow() {

  const  { isLoading, hasError, tvList, tvType, searchTvShow, changeTvShowsCategory, changePage }
  = useContext(ApiContext);
 

  const sidebarData = [
    { id: "trending", typeName: "Trending" },
    { id: "airing_today", typeName: "Airing Today" },
    { id: "popular", typeName: "Popular" },
    { id: "top_rated", typeName: "Top Rated" },
    { id: "on_the_air", typeName: "On The Air" },
  ];


  return (
    <>
     <Helmet>
        <title>Tv Shows | MovieBox</title>
     </Helmet>

      <HiddenSidebar
        pageName={"Tv Shows"}
        sidebarData={sidebarData}
        changeType={changeTvShowsCategory}
      />

      <section className={styles.section}>
        <div className={styles.navFix}>
          <div className="container">
            <div className="row mt-3 mb-3">
              <div className="col-lg-2 mb-4">
                <Sidebar
                  sidebarData={sidebarData}
                  changeType={changeTvShowsCategory}
                />
              </div>

              <div className="col-lg-10">
                <div
                  className={`${styles.tv_section} container text-light rounded-1`}
                >
                  <div className="d-flex justify-content-between">
                    <h3 className={`${styles.section_title}`}>
                      {tvType?.replace("_", " ")} Shows
                    </h3>

                    <SearchForm searchData={searchTvShow} />
                  </div>

                  <div className="row">
                    {isLoading && <Loading />}
                    {hasError && <ConnectionErr />}

                    {tvList &&
                      tvList.results?.map((reqShow, index) => (
                        <LayoutBox key={index} reqData={reqShow} page='tvShows'/>
                      ))}

                    <div className="d-flex justify-content-center mt-4">
                      <Pagination paginate={changePage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
      </section>
    </>
  );
}
