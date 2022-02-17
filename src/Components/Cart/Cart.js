import React,{useContext,useState} from 'react';
import Modal from '../UI/Modal';
import styles from "./Cart.module.css";
import CartContext from "../../Context/cart-context";
import CartItem from "./CartItem"
import CheckoutForm from './CheckoutForm';
import Spinner from '../Layout/Spinner';
import tick from "../../assets/tick.png";

export default function Cart(props) {

  const [showCheckout,setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)
  
  const contextData = useContext(CartContext);

  const totalAmount = `$${contextData.totalAmount.toFixed(2)}`;

  const hasItems = contextData.items.length > 0 ;

  const cartItemAddHandler=(item)=>{
      contextData.addItem({...item,quantity:1})
  }

  const cartItemRemoveHandler=(id)=>{
    contextData.removeItem(id);
  }

  const orderHandler = ()=>{
    setShowCheckout(true);
  }

  const SubmitOrderHandler =(userData)=>{
    setShowCheckout(false);
    setIsSubmitting(true);
      fetch("https://food-order-97b69-default-rtdb.firebaseio.com/orders.json",{
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems : contextData.items
        })
      })
      setIsSubmitting(false);
      setDidSubmit(true);
      contextData.clearCart();
  }

  const CartItems = (<ul className={styles['cart-items']}>
    {contextData.items.map((item)=>{
      return <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} 
                      onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
    })}
  </ul>)

  const modalActions = <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

  return (
    <Modal onClose={props.onHideCart}>
        {!showCheckout && !isSubmitting && !didSubmit && CartItems}
        { !showCheckout && !isSubmitting && !didSubmit && <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>}
        
        {showCheckout && !isSubmitting && !didSubmit && <CheckoutForm onConfirm={SubmitOrderHandler} onCancel={props.onHideCart}/>}

        {!showCheckout && !isSubmitting && !didSubmit && modalActions}

        {!showCheckout && !didSubmit && isSubmitting && <React.Fragment>
          <Spinner/>
          <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
          </div>
          </React.Fragment>}

        {!showCheckout && didSubmit && !isSubmitting && <React.Fragment>
          <div className={styles.submit}>
            <img className={styles.image} src={tick} alt="" width="100px"/>
            <p>Order Recieved!</p>
          </div>

          <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
          </div>
          
          </React.Fragment>}

    </Modal>
  );
}
