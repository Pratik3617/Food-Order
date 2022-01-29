import React,{Fragment,useContext,useState,useEffect} from 'react';
import CartIcon from "../Cart/CartIcon"; 
import styles from "./HeaderCartButton.module.css";
import CartContext from '../../Context/cart-context';

export default function HeaderCartButton(props) {

    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const contextData=useContext(CartContext);
    
    const noOfCartItems = contextData.items.reduce((currNo,item)=>{
        return currNo+item.quantity;
    },0)

    const btnClasses = `${styles.icon} ${btnHighlighted ? styles.bump :''}` ;

    useEffect(() => {
      
        if(contextData.items.length === 0){
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnHighlighted(false);
        },300)
        return()=>{
            clearTimeout(timer);
        }
    }, [contextData.items]);
    

  return (
      <Fragment>
          <button className={styles.button} onClick={props.onClick}>
              <span className={btnClasses}><CartIcon/></span>
              <span className={styles.badge}>{noOfCartItems}</span>
          </button>
      </Fragment>
  );
}
