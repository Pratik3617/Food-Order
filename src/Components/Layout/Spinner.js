import React from 'react'
import spinner from "../../assets/spinner.gif";
import styles from "./Spinner.module.css";

export default function Spinner () {
  return (
    <div className={styles.spinner}>
        <img src={spinner} alt='spinner'/>
    </div>
  )
}
