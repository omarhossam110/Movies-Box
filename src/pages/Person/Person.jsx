import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ApiContext } from "../../context/ApiContext";

import LayoutBox from "../../components/LayoutBox/LayoutBox";
import ConnectionErr from "../../components/ConnectionErr/ConnectionErr";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/SearchForm/SearchForm";
import BackToTop from "../../components/BackToTop/BackToTop";
import styles from "../index.module.css";

export default function Person() {

  const  { isLoading, hasError, personList, searchPerson, changePage }  = useContext(ApiContext);


  return (
    <>
     <Helmet>
        <title>Actors & Directors | MovieBox</title>
     </Helmet>

      <section>
        <div className={styles.navFix}>
          <div className="container mt-3 mb-3">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="container">
                  <div className="d-flex justify-content-between mb-2">
                    <h2 className={`${styles.section_title}`}>
                      Popular People
                    </h2>

                    <SearchForm searchData={searchPerson} />
                  </div>

                  <div className="row mt-3">
                    {isLoading && <Loading />}
                    {hasError && <ConnectionErr />}

                    {personList &&
                      personList.results?.map((reqPerson, index) => (
                        <LayoutBox key={index} reqData={reqPerson} page='persons' />
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
