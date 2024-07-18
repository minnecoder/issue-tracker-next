import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AddProjectComponent from "../components/AddProject/AddProject";
import styles from "../styles/CreateProject.module.css";

export default function Projects() {
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <Sidebar />
        <AddProjectComponent />
      </div>
    </div>
  );
}
