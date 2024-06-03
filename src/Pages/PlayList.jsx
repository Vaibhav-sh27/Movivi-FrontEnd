import React, { useContext, useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate, useParams } from "react-router-dom";
import { Context } from "../contexts/Context";
import styles from "./PlayList.module.css";
import Card from "../Components/Card";
import InsidePlayCard from "../Components/InsidePlayCard";
import avatar from "../assets/avatar.jpeg";
import axios from "axios";
import AlertModal from "../Components/AlertModal";
import { useAuth } from "../contexts/AuthContext";
import UpdateModal from "../Components/UpdateModal";

const PlayList = () => {
  let { play, setShow, setAlert, setPlay, setShowEdit, setEdit } = useContext(Context);
  const { token, currUser, setUser } = useAuth();
  let id = useParams().id;
  let [currPlay, setCurrPlay] = useState("");
  let navigate=useNavigate();

  useEffect(() => {

    async function getData() {
      await axios
        .post(`${import.meta.env.VITE_BAPI_URL}/playlist/${id}`, currUser)
        .then((res) => {
          if (res.status == 215) {
            console.log(res);
            setShow(true);
            setAlert(res.data.msg);
          }
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

  async function handleDelete() {
    try {
      let res=await axios.delete(`${import.meta.env.VITE_BAPI_URL}/playlist/${currUser._id}/${currPlay._id}`);
      setUser(res.data.currUser);
      let newPlay= play.filter((item)=>item._id!==currPlay._id);
      await setPlay(newPlay);
       navigate('/playlists');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <AlertModal />
      <UpdateModal/>
      <div className={styles.nav}>
        <h1>
          <i className="fas fa-circle-play"></i> {currPlay.name}
        </h1>
        <h2>
          {currPlay.access} PlayList
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {currPlay.owner === currUser.email ? (
              <div style={{display:'flex', justifyContent:'space-between'}}>
              <div
                onClick={() => {
                  handleDelete()
                }}
                className={styles.deloption}
              >
                <i className="fas fa-trash-can"></i>
                <h5>Delete</h5>
              </div>
              <div
                onClick={() => {
                  setEdit(currPlay);
                  setShowEdit(true);
                }}
                className={styles.option}
              >
                <i className="fas fa-edit"></i>
                <h5>Edit</h5>
              </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.avtar} style={{ marginLeft: "15px" }}>
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>
{currPlay.movies && currPlay.movies.length>0 ? 
  <div className={styles.playcont}>
        {currPlay.movies && currPlay.movies.map((item) => {
            return (
              <InsidePlayCard
                data={item}
                isOwner={currUser.email === currPlay.owner}
                playId={currPlay._id}
              />
            );
          }) 
           }
      </div> :
      <h1 style={{display:'flex', alignItems:'center', justifyContent:'center', height:'70vh'}}>It Seems Empty ! &nbsp; <i class="fas fa-binoculars"></i></h1>
}
      
    </div>
  );
};

export default PlayList;
