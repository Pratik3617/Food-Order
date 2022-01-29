import React,{useContext} from 'react';
import Modal from '../UI/Modal';
import styles from "./Cart.module.css";
import CartContext from "../../Context/cart-context";
import CartItem from "./CartItem"

export default function Cart(props) {
  
  const contextData = useContext(CartContext);

  const totalAmount = `$${contextData.totalAmount.toFixed(2)}`;

  const hasItems = contextData.items.length > 0 ;

  const cartItemAddHandler=(item)=>{
      contextData.addItem({...item,quantity:1})
  }

  const cartItemRemoveHandler=(id)=>{
    contextData.removeItem(id);
  }

  const CartItems = (<ul className={styles['cart-items']}>
    {contextData.items.map((item)=>{
      return <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} 
                      onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
    })}
  </ul>)

  return (
    <Modal onClose={props.onHideCart}>
        {CartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={styles.button}>Order</button>}
        </div>
    </Modal>
  );
}
