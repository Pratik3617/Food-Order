import React,{useState,useEffect,useCallback} from 'react';
import styles from "./AvailableMeals.module.css"
import Card from '../UI/Card';
import MealItem from './MealItems/MealItem';
import Spinner from '../Layout/Spinner';


export default function AvailableMeals() {

  const [meals, setMeals] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  const [error,setError] = useState(null);

  const fetchMealsHandler = useCallback(async() => {
    setisLoading(true);
    setError(null);
    try{
      const response = await fetch("https://food-order-97b69-default-rtdb.firebaseio.com/meals.json");
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      
      const loadedMeals = [];

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
    }
    catch(error){
      setisLoading(false);
      setError(error.message);
    }
    setisLoading(false);
  },[]);

  useEffect(()=>{
    fetchMealsHandler();
  },[fetchMealsHandler])

  

  return (
    
    <div className={styles.meals}>
      <Card>
        {!isLoading && <ul>
          {meals.map((meal)=>{
            return <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>;
          })}
        </ul>}
        {!isLoading && error &&<p className={styles.error}>{error}</p>}
        {isLoading && <Spinner/>}
        
      </Card>
    </div>);
}
