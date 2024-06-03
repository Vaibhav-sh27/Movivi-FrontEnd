import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const {currUser} = useAuth();
  return (
    <div className={styles.sidebar}>
      <img src={logo} alt="" srcset="" />

      <div>
        <Link to="/" className={styles.option}>
          <i className="fas fa-house"></i>
          <h5>Search</h5>
        </Link>
        <Link to="/publicplay" className={styles.option}>
        <i class="fas fa-arrow-trend-up"></i>
          <h5>PublicPlay</h5>
        </Link>
        <Link to="/playlists" className={styles.option}>
          <i className="fas fa-circle-play"></i>
          <h5>Playlists</h5>
        </Link>
      </div>

      <div>
        {currUser? 
        <Link to="/logout" className={styles.option}>
          <i className="fas fa-right-from-bracket"></i>
          <h5>Log Out</h5>
        </Link> :
        <Link to="/login" className={styles.option}>
          <i className="fas fa-right-to-bracket"></i>
          <h5>Log In</h5>
        </Link>}
      </div>
    </div>
  );
};

export default Sidebar;
