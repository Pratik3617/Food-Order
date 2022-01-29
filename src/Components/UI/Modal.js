import React,{Fragment} from 'react';
import styles from "./Modal.module.css"
import ReactDOM from "react-dom"

const BackDrop=()=>{
    return <div className={styles.backdrop}/>;
}

const ModalOverlay=(props)=>{
   return <div className={styles.modal} onClick={props.onClose} >
       <div className={styles.content} >
            {props.children}
       </div>
   </div>;
}

const portalElement=document.getElementById('overlays');

export default function Modal(props) {
  return <Fragment>
      {ReactDOM.createPortal(<BackDrop />,portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onClick={props.onClose}>{props.children}</ModalOverlay> , portalElement)}
      
  </Fragment>;
}
