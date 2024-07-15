import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.css";

export default function Login() {
  const history = useRouter();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
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

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch("/api/v1/users/add", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, "error")) {
          setState({
            error: data.error,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }
        if (Object.prototype.hasOwnProperty.call(data, "token")) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("First Name", data.firstName);
          sessionStorage.setItem("Last Name", data.lastName);

          history.push("/tickets");
        }
      });
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Delivery Notes</h1>
        <h4 className={styles.formError}>{state.error}</h4>
        <div className={styles.inputGroup}>
          <label className={styles.formLabel} htmlFor="firstName">
            First Name
          </label>
          <input
            className={styles.formInput}
            name="firstName"
            type="text"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.formLabel} htmlFor="lastName">
            Last Name
          </label>
          <input
            className={styles.formInput}
            name="lastName"
            type="text"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.formLabel} htmlFor="email">
            Email
          </label>
          <input
            className={styles.formInput}
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.formLabel} htmlFor="password">
            Password
          </label>
          <input
            className={styles.formInput}
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <input
          className={styles.submitButton}
          type="submit"
          value="Register User"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
