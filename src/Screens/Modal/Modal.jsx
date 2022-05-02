import React from "react";
import styles from './Modal.module.css'
import './Modal.module.css'


export default function Modal ({children}) {
    return (
        <article className={styles.modal}>
        
           
         <div className={styles.modalContainer}> 
        
            {children}
         </div> 
        </article>
        
    )
}