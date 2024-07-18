import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { AiOutlineDashboard, AiOutlineProject } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className={styles.main}>
      <ul>
        <li>
          <Link href="/dashboard" className={styles.sideBarLink}>
            <AiOutlineDashboard style={{ color: "white", fontSize: "2rem" }} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/projects" className={styles.sideBarLink}>
            <AiOutlineProject style={{ color: "white", fontSize: "2rem" }} />
            Projects
          </Link>
        </li>
        <li>
          <Link href="/tickets" className={styles.sideBarLink}>
            <IoTicketOutline style={{ color: "white", fontSize: "2rem" }} />
            My Tickets
          </Link>
        </li>
        {/* <li><SidebarLink to="/manageroles">Manage Roles</SidebarLink></li>
                <li><SidebarLink to="/manageusers">Manage Users</SidebarLink></li> */}
      </ul>
    </div>
  );
}
