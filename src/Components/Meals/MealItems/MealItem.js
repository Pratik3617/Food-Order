import React,{useContext} from 'react';
import styles from "./MealItem.module.css";
import MealItemForm from './MealItemForm';
import CartContext from "../../../Context/cart-context"

export default function MealItem(props) {

    const contextData = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`

    const AddtoCartHandler =(quantity)=>{
        contextData.addItem({
            id : props.id,
            name : props.name ,
            quantity : quantity,
            price: props.price
        })
    }

  return <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
                
            <div>
                <MealItemForm onAddToCart={AddtoCartHandler} id={props.id}/>
            </div>
        
        </li>;
}
