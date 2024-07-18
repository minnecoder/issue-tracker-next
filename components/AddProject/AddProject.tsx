import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./AddProject.module.css";

export default function AddProjectComponent() {
  let history = useRouter();
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  function handleChange(event: { target: { name: any; value: any } }) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (sessionStorage.getItem("demo") !== null) {
      await fetch("api/v1/projects", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.title,
          description: state.description,
        }),
      });
    }
    history.push("/projects");
  }

  return (
    <div className={styles.wrapper}>
      <button className="closeBtn" onClick={() => history.push("/projects")}>
        {" "}
        Close
      </button>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          value={state.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          name="description"
          type="text"
          value={state.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button onClick={handleSubmit} className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
