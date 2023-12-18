import React from "react";
import { Form, FormControl } from "react-bootstrap";
import styles from "./Search.module.css";

export default function SearchForm({searchData}) {
  return (
    <>
      <Form
        className={`${styles.search_form}`}
        role="search"
        onSubmit={searchData}
      >
        <FormControl
          className={`form-control me-2 ${styles.search_input}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="query"
          // value={query}
          onChange={searchData}
        />
      </Form>
    </>
  );
}
