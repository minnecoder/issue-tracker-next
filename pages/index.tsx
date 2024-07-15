import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  let history = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  function handleChange(event: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  }

  function demoLogin() {
    sessionStorage.setItem("firstName", "Demo");
    sessionStorage.setItem("lastName", "User");
    sessionStorage.setItem("demo", "true");
    history.push("/tickets");
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const response = await fetch("/api/v1/users/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    });
    if (response.status === 400) {
      const json = await response.json();
      setState({
        error: json.error,
        email: "",
        password: "",
      });
    }
    if (response.status === 200) {
      const json = await response.json();
      sessionStorage.setItem("token", json.token);
      sessionStorage.setItem("firstName", json.firstName);
      sessionStorage.setItem("lastName", json.lastName);
      history.push("/tickets");
    }
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>Issue Tracker</h1>
        <h4>{state.error}</h4>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <input className={styles.submitButton} type="submit" value="Login" />
        <div className={styles.loginLinks}>
          <button
            onClick={() => {
              history.push("/register");
            }}
          >
            Register User
          </button>
          <button onClick={() => demoLogin()}>Login as a Demo User</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
