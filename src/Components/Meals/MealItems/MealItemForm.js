import React,{useRef,useState} from 'react';
import Input from '../../UI/Input';
import styles from "./MealItemForm.module.css"

export default function MealItemForm(props) {

    const quantityRef = useRef();
    const [quantityIsValid, setQuantityIsValid] = useState(true);

    const suubmitHandler=(event)=>{
        event.preventDefault();
        const enteredQuantity = quantityRef.current.value;
        const enteredQuantityNum = + enteredQuantity;
        if(enteredQuantity.trim().length === 0 || enteredQuantityNum < 1 || enteredQuantityNum > 10){
            setQuantityIsValid(false);
            return ;
        }

        props.onAddToCart(enteredQuantityNum);

    }

    

  return (
      <form onSubmit={suubmitHandler} className={styles.form}>
          <Input ref={quantityRef} label="Quantity" input={{id:`"quantity_"+${props.id}`,type:"number",min:"1",step:"1",defaultValue:"1"}}/>
          <button >+ Add</button>
          {!quantityIsValid && <p>Please enter a valid quantity.</p>}
      </form>
  );
}
