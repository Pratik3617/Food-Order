import React,{Fragment} from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealImg from "../../assets/meals.jpg"
import styles from "./Header.module.css"

export default function Header(props) {
  return (
      <Fragment>
          <header className={styles.header}>
              <h1>ReactMeals</h1>
              <HeaderCartButton onClick={props.onShowCart}/>
          </header>
          <div className={styles.image}>
              <img src={mealImg} alt=''/>
          </div>
      </Fragment>
  );
}
