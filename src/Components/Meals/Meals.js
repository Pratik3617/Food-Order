import React from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
import styles from "./Meals.module.css"

export default function Meals() {
  return (
      <div className={styles.meal}>
          <MealsSummary/>
          <AvailableMeals/>
      </div>
  );
}
