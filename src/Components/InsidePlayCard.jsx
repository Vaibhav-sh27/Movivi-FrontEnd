import React, { useContext, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { Context } from "../contexts/Context";
import axios from "axios";
import AddModal from "./AddModal";

const InsidePlayCard = ({ data, isOwner, playId }) => {
  let [movie, setMovie] = useState([]);
  let { setPlayItem, setShow, play, setPlay } = useContext(Context);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${import.meta.env.VITE_MAPI_URL}&i=${data.imdbID}`)
        .then((res) => {
          setMovie(res.data);
          // console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  async function handleDelete() {

    try {
      let res=await axios.delete(`${import.meta.env.VITE_BAPI_URL}/movie/${playId}/${data.imdbID}`);
      
      setPlay((item)=>item.map((p)=>{
          if(p._id===playId){
              // console.log('push');
              p.movies=p.movies.filter((m)=> m.imdbID !== data.imdbID);
          }
          return p;
        }))
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.star}>⭐ {movie.imdbRating}</div>
      {/* <img src="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&amp;fit=crop&amp;w=667&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"/> */}
      <img src={data.Poster} alt="" />

      <div className={styles.info}>
        <h2>{data.Title}</h2>
        {movie.Plot &&
          (movie.Plot.length > 100 ? (
            <p>{movie.Plot.slice(0, 100)}...</p>
          ) : (
            <p>{movie.Plot}</p>
          ))}
        <div>
          <button style={{ marginLeft: "5px" }}>See Details</button>
          {isOwner ? (
            <button
              style={{
                marginLeft: "30px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsidePlayCard;
