import React, { useContext, useRef, useState } from 'react'
import styles from "./Navbar.module.css";
import {Context} from "../contexts/Context"
import avatar from "../assets/avatar.jpeg"
import axios, { Axios } from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  let {setArr}=useContext(Context);
  let query= useRef();
  
  function handleSearch(e) {
    e.preventDefault();
    if(query.current.value.length>=3){
      console.log(query.current.value);
        getData(query.current.value);

      } else {
        setArr([]);
      }
    }

  async function getData(qer) {

    await axios
      .get(`${import.meta.env.VITE_MAPI_URL}&s=${qer}`)
      .then((res) => {
        res.data.Search? setArr(res.data.Search) : setArr([]);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

}


  return (
    <div className={styles.nav}>
        <div className={styles.search}>
        <i class="fas fa-magnifying-glass" style={{fontSize:'30px'}}></i>
        <input type="text" placeholder='Search for Movies, TV shows...' ref={query} onChange={handleSearch}/>
        </div>
        <div className={styles.avtar}><img src={avatar} alt="" /></div>
    </div>
  )
}

export default Navbar