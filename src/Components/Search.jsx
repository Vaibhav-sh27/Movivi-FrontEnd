import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import CardContainer from './CardContainer'
import { Context } from '../contexts/Context';
import axios from 'axios';

const Search = () => {
  // let {qer, setArr}=useContext(Context);
  return (
    <div>
        <Navbar/>
        <CardContainer/>
    </div>
  )
}

export default Search