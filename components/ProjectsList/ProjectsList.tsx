import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./ProjectsList.module.css";

export default function ProjectList2() {
  let abortController = new AbortController();
  let history = useRouter();
  const [projects, updateProjects] = useState([]);

  async function fetchProjects() {
    const response = await fetch("/api/v1/projects", {
      signal: abortController.signal,
    });
    const json = await response.json();
    updateProjects(json.data);
  }

  useEffect(() => {
    // let isMounted = true
    fetchProjects();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>Projects</h2>
        <button onClick={() => history.push("/addproject")}>
          Add A Project
        </button>
      </div>
      <div className={styles.dataTitles}>
        <p>Title</p>
        <p>Description</p>
        <p># of Tickets</p>
      </div>
      <div className={styles.dataItems}>
        {projects.map((project) => (
          <div
            className={styles.dataItem}
            key={project.title}
            onClick={() =>
              history.push({
                pathname: "/projectticket",
                state: { data: project },
              })
            }
          >
            <p>{project.title}</p>
            <p>{project.description}</p>
            <p>{project.tickets.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
