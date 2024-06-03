import React, { useContext } from 'react'
import Card from './Card'
import styles from "./CardContainer.module.css"
import { Context } from '../contexts/Context'
import AddModal from './AddModal'

const CardContainer = () => {
    let {array} = useContext(Context);
  return (
    <>
      <AddModal/>
      <div className={styles.container}>
    {array.length>0 ? array.map((item)=>{
        return <Card data={item}/>
    }) : <div className={styles.searchIcon}><i class="fas fa-magnifying-glass" style={{fontSize:'10rem'}}></i></div>}
    </div>
    </>
  )
}

export default CardContainer