import React, { useContext, useEffect, useState } from 'react'
import styles from "../Components/Playlist.module.css";
import avatar from "../assets/avatar.jpeg"
import { Context } from '../contexts/Context';
import CreateModal from '../Components/CreateModal';
import PlayCard from '../Components/PlayCard';
import AlertModal from '../Components/AlertModal';
import axios from 'axios';
import playback from "../assets/playback2.png";

const PublicPlay = () => {
  let { play, setShow, setAlert } = useContext(Context);
  let [currPlay, setCurrPlay] = useState("");
  


  useEffect(() => {

    async function getData() {
      await axios
        .get(`${import.meta.env.VITE_BAPI_URL}/playlist/all`)
        .then((res) => {
          setCurrPlay(res.data);
          console.log(res);
        })
        .catch((err) => {
          setShow(true);
          setAlert(err.response.data.msg);
          console.log(err);
        });
    }
    getData();
  }, []);
  return (
    <div className={styles.playlist}>
    <AlertModal />
        <div>
            <div className={styles.nav}>
                <h1><i class="fas fa-arrow-trend-up"></i> Public Play</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                <div className={styles.avtar} style={{marginLeft:'15px'}}><img src={avatar} alt="" /></div>
                </div>
            </div>
            <div className={styles.playcont}>
                {currPlay&& currPlay.map(( item)=>{
                    return <PlayCard data={item} />
                })}
            </div>
        </div>
    </div>
  )
}

export default PublicPlay