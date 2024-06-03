import React, { useContext } from 'react'
import styles from "./Playlist.module.css";
import avatar from "../assets/avatar.jpeg"
import { Context } from '../contexts/Context';
import CreateModal from './CreateModal';
import PlayCard from './PlayCard';

const Playlist = () => {
    const {show, setShow, play} = useContext(Context);
  return (
    <div className={styles.playlist}>
    <CreateModal/>
        <div>
            <div className={styles.nav}>
                <h1>Your PlayLists</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                <div onClick={()=>{setShow(true)}} className={styles.option}>
                    <i className="fas fa-add"></i>
                    <h5>Create</h5>
                </div>
                </div>
                <div className={styles.avtar} style={{marginLeft:'15px'}}><img src={avatar} alt="" /></div>
                </div>
            </div>
            <div className={styles.playcont}>
                {play&& play.map((item)=>{
                    return <PlayCard data={item}/>
                })}
            </div>
        </div>

        <div></div>
    </div>
  )
}

export default Playlist