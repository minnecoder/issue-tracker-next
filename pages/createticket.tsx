import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateTicketComponent from "../components/CreateTicket/CreateTicket";
import styles from "../styles/CreateTicket.module.css";

export default function Projects() {
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <Sidebar />
        <CreateTicketComponent />
      </div>
    </div>
  );
}
