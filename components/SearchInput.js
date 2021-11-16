import React from "react";
import styles from "@styles/SearchInput.module.css";
import { AiOutlineSearch } from "react-icons/ai";
function SearchInput() {
  return (
    <div className={styles.searchInput}>
      <AiOutlineSearch fontSize={18} />
      <input
        type="text"
        placeholder="Search our delicius brugers"
        className={styles.searchInput__input}
      />
    </div>
  );
}

export default SearchInput;
