import React from "react";
import { NextPage } from "next";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ProjectsList from "../components/ProjectsList/ProjectsList";
import styles from "../styles/Projects.module.css";

const Projects: NextPage = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Sidebar />
      <ProjectsList />
    </div>
  );
};

export default Projects;
