import React,{useState, useRef} from "react";
import styles from "./CheckoutForm.module.css";

const isEmpty = (value)=>{
    return value.trim().length===0;
}

const isPostalCode = (value)=>{
    return value.trim().length===6;
}

export default function CheckoutForm (props) {

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    })
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();
    
    const confirmHandler = (event) =>{

        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isPostalCode(enteredPostalCode);

        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalIsValid,
            city:enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city:enteredCity
        })

    }

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
        <h2>Add Address:</h2>
      <div className={`${styles.control} ${formInputValidity.name ? '':styles.invalid}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name.</p>}
      </div>

      <div className={`${styles.control} ${formInputValidity.street ? '':styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid Street.</p>}
      </div>

      <div className={`${styles.control} ${formInputValidity.postalCode ? '':styles.invalid}`}>
        <label htmlFor="postalcode">Postal Code</label>
        <input type="text" id="postalcode" ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Please enter a valid Postalcode (6 characters long).</p>}
      </div>

      <div className={`${styles.control} ${formInputValidity.city ? '':styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid city.</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}
