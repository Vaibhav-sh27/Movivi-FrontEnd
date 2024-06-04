import React from 'react'
import styles from "./Tags.module.css";

const Tags = ({tagName}) => {
  return (
    <div className={styles.tag}>
    <p>{tagName}</p>
    </div>
  )
}

export default Tags