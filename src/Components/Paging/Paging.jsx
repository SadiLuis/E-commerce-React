import React, { useId } from 'react'
import styles from './Paging.module.css'

export default function Paging({productsOnPage, allProducts, paginado, next, previous}){
const pageNumbers = []

for(let i=0; i<Math.ceil(allProducts/productsOnPage); i++){
    pageNumbers.push(i +1)
}

const  id = useId()
return(
    <div className={styles.container}>
        <ul className={styles.paging}>
     
            {
                pageNumbers && pageNumbers.map((num,id)=>{
                    return(
                         <button key={`page-${id}`} className='page-link' onClick={()=>paginado(num)}>{num}</button>
                    )
                   
                })
            }
         
        </ul>
    </div>
)

}