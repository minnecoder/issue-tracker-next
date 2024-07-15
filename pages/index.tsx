import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Login() {
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
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <h1>Issue Tracker</h1>
        <h4>{state.error}</h4>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Login" />
        <div className="loginLinks">
          <button
            onClick={() => {
              history.push("/register");
            }}
          >
            Register User
          </button>
          <button onClick={() => demoLogin()}>Login as a Demo User</button>
        </div>
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  background: #128deb;
  height: 100vh;
  width: 100%;
`;

const LoginForm = styled.form`
  position: absolute;
  top: 10%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: white;
  width: 30rem;
  padding: 2rem 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  h1 {
    text-align: center;
    color: #0d62a4;
    padding-bottom: 0.5rem;
  }

  h4 {
    color: red;
  }
  .inputGroup {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
  }
  label {
    margin-left: 0.75rem;
  }
  input {
    margin: 0.25rem 0.75rem;
    padding: 0.5rem;
    border-radius: 3px;
    border: 1px solid black;
  }
  input[type="submit"] {
    margin-top: 0.75rem;
    background: #eb7012;
    color: white;
    border-radius: 3px;
    border: none;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }
  .loginLinks {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }
  .loginLinks button {
    background: #128deb;
    margin: 0.5rem;
    padding: 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }
`;
