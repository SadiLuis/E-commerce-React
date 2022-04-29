import React from 'react'
import styles from './Paging.module.css'

export default function Paging({productsOnPage, allProducts, paginado, next, previous}){
const pageNumbers = []

for(let i=0; i<Math.ceil(allProducts/productsOnPage); i++){
    pageNumbers.push(i +1)
}

return(
    <div className={styles.container}>
        <ul className={styles.paging}>
     
            {
                pageNumbers && pageNumbers.map(num=>{
                    return(
                         <button className='page-link' onClick={()=>paginado(num)}>{num}</button>
                    )
                   
                })
            }
         
        </ul>
    </div>
)

}