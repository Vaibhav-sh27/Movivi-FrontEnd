import React, { useEffect, useMemo, useState } from 'react'
import styles from "./PlayCard.module.css";
import { Link } from "react-router-dom";
import playback from "../assets/playback2.png"
import axios from 'axios';

const PlayCard = ({data}) => {

  let rand = Math.floor(Math.random()*100);
  let [imgg, setImgg]=useState(playback);
  useEffect( ()=>{
    setImgg(`https://source.unsplash.com/random/300x200?sig=${rand}`);

  },[])

  return (
    <Link to={`/playlists/${data._id}`} className={styles.playcard}>
        <img src={imgg} alt="" />
        <div className={styles.info}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h5><i className="fas fa-circle-play"></i> &nbsp; {data.name}</h5>
            <h6>{data.access}</h6>
          </div>
            <p>Created By : {data.owner}</p>
        </div>
    </Link>
  )
}

export default PlayCard