import React, { useContext, useEffect, useState } from "react";
import styles from "./SeeDetails.module.css";
import avatar from "../assets/avatar.jpeg"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import playback from "../assets/playback.jpg"
import Tags from "./Tags";
import ReactPlayer from 'react-player'; 
import movieTrailer from 'movie-trailer'; 
import { Context } from "../contexts/Context";
import AddModal from "./AddModal";


const SeeDetails = () => {

    let {setPlayItem, setShow}=useContext(Context);
    let id = useParams().id;
    let [movie, setMovie]=useState("");
    let [data, setData]=useState("");
    const navigate = useNavigate();
    

    useEffect(()=>{
        async function getData() {
            await axios
              .get(`${import.meta.env.VITE_MAPI_URL}&i=${id}`)
              .then((res) => {
                setMovie(res.data);
                setData({
                  Title: res.data.Title,
                  Year: res.data.Year,
                  imdbID: res.data.imdbID,
                  Type: res.data.Type,
                  Poster: res.data.Poster
                })
                // console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
              
        }
        getData();
    },[])


    const time = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}m`;
    };

  return (
    <div className={styles.content}>
    <AddModal/>
      <div className={styles.nav}>
        <div onClick={() => navigate(-1)} className={styles.back}>
          <i class="fas fa-circle-left"></i>
        </div>
        <h1 style={{margin:'0px 10px'}}>
          <i class="fas fa-film"></i> &nbsp; {movie.Title}
        </h1>
        <h1 style={{margin:'0px 10px'}}>
          Type : {movie.Type?.charAt(0)?.toUpperCase() + movie.Type?.slice(1)}
        </h1>
        <div className={styles.info}>
        <button style={{marginLeft:'30px'}} onClick={async ()=>{
        // console.log(data);
          await setPlayItem(data);
          setShow(true);
        }}>+Add to PlayList</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.avtar} style={{ marginLeft: "15px" }}>
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>

      <div className={styles.detailscont}>
        <div className={styles.trailer}>
          {/* <img className={styles.trailer} src={playback} alt="" /> */}
           <Player name={movie.Title+""} year={movie.Year} type={movie.Type} />
        </div>
        <div className={styles.details}>
          <div className={styles.leftdet}>
            <div>
              <h3>
                {movie.Title} &nbsp;• &nbsp;{movie.Year} &nbsp;• &nbsp;
                {movie.Rated} &nbsp;• &nbsp;{time(movie.Runtime?.slice(0, 3))}
              </h3>
              <div style={{ marginTop: "1rem" }}>
                {movie.Genre?.split(",").map((tag) => {
                  return <Tags tagName={tag.trim()} />;
                })}
              </div>
            </div>
            <div className={styles.plot}>
              <p>{movie.Plot}</p>
            </div>
            <div className={styles.specs}>
              <div className={styles.director}>
                <p>
                  Director :{" "}
                  <span style={{ color: "#3DD2CC" }}>{movie.Director}</span>
                </p>
              </div>
              <div className={styles.writers}>
                <p>
                  Writers :{" "}
                  <span style={{ color: "#3DD2CC" }}>{movie.Writer}</span>
                </p>
              </div>
              <div className={styles.stars}>
                <p>
                  Stars :{" "}
                  <span style={{ color: "#3DD2CC" }}>{movie.Actors}</span>
                </p>
              </div>
              <div className={styles.toprated}>
                {" "}
                <div className={styles.tprbtn}>
                  Top rated movie # {movie.Metascore}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardcont}>
            <div className={styles.card}>
              <div className={styles.star}>⭐ {movie.imdbRating}</div>
              <img src={movie.Poster} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Player = ({name, year, type}) => {
  let [vurl, setVurl]=useState("");

  let obj = type==='series'? {videoType: 'tv', year: year} : {year: year}

  movieTrailer(name, obj).then((res) => { 
    console.log(res);
    setVurl(res); 
  }); 

  return (
    <>
      {vurl ? <ReactPlayer width={'100%'} height={'100%'} url={vurl} controls={true} />:
      <img className={styles.trailer} src={playback} alt="" />}
    </>
  )
}


export default SeeDetails;
