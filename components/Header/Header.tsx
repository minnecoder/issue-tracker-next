import React from "react";
import { useRouter } from "next/router";
import { FaChevronDown } from "react-icons/fa";
import styles from "../Header.module.css";

export default function Header() {
  let history = useRouter();
  function logout() {
    sessionStorage.clear();
    history.push("/");
  }
  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <h3>Issue Tracker</h3>
        </div>
        <ul className={styles.right}>
          {/* <SearchBar>
            <FaSearch style={{ paddingRight: '.25rem' }} />
            <input type="search" name="search" id="search" placeholder="Search..." />
          </SearchBar>
          <li>Notifications</li> */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              Users
              <FaChevronDown style={{ paddingTop: ".35rem" }} />
            </button>
            <div className={styles.dropdownContent}>
              <button onClick={() => logout()}>Log Out</button>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
