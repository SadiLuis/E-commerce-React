import React, { useEffect, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentByProductId, getProductRating } from '../../../Actions/Comments'
import { FaStar } from 'react-icons/fa'

import styles from "./Reviews.module.css"



export default function Review({idProduct}) {
    const dispatch = useDispatch()
    const id = useId()

    const reviews = useSelector((state) => state.commentReducer.comentariosProducto)
    const rating = useSelector((state) => state.commentReducer.ratingProducto)

    useEffect(() => {
        dispatch(getProductRating(idProduct))
        dispatch(getCommentByProductId(idProduct))
    }, [idProduct])

  return (
      
    <div className={styles.bigContainer}>
        <h1>Lo que otras personas opinan sobre el producto</h1>
         {
             rating.ratingProm !== null ? 
             <div className={styles.bigNumber}>
            <h3>Lo han calificado de {Math.floor(rating.ratingProm) == 5 ? "EXCELENTE" :
             Math.floor(rating.ratingProm) == 4 ? "MUY BUENO" :
             Math.floor(rating.ratingProm) == 3 ? "BUENO" :
             Math.floor(rating.ratingProm) == 2 ? "REGULAR" :
             Math.floor(rating.ratingProm) == 1 ? "MALO" : ""
            }
             </h3>
            
            {
                   [...Array(5)].map((star, index) => {
                        return (
                            <FaStar 
                            size={70} 
                            // color={index  + 1 <= (Math.floor(rating.ratingProm)) ? "#ffc107" : "#e4e5e9" }
                            color={index  + 1 <= (Math.floor(rating.ratingProm)) ? "#ffc107" : "#e4e5e9" }  
                            
                            />

                        )
                   } )    
                }
            <h6>Entre {rating.cantidadRating} opiniones</h6>
        </div>
        :
        <div className={styles.bigNumber}>
            <h3>Todavia no tiene calificaciones {Math.floor(rating.ratingProm) == 5 ? "EXCELENTE" :
             Math.floor(rating.ratingProm) == 4 ? "MUY BUENO" :
             Math.floor(rating.ratingProm) == 3 ? "BUENO" :
             Math.floor(rating.ratingProm) == 2 ? "REGULAR" :
             Math.floor(rating.ratingProm) == 1 ? "MALO" : ""
            }
             </h3>
            
            {
                   [...Array(5)].map((star, index) => {
                        return (
                            <FaStar 
                            size={70} 
                            // color={index  + 1 <= (Math.floor(rating.ratingProm)) ? "#ffc107" : "#e4e5e9" }
                            color={index  + 1 <= (Math.floor(rating.ratingProm)) ? "#ffc107" : "#e4e5e9" }  

                            />

                        )
                   } )    
                }
        </div> 
        }   
        
        
        <div className={styles.reviewCards}>
        { reviews?.map((r) => (
            <div className={styles.eachCard}>
                {r.rating == 5 ? <h3><b>EXCELENTE</b></h3> : null}
                {r.rating == 4 ? <h3><b>MUY BUENO</b></h3> : null}
                {r.rating == 3 ? <h3><b>BUENO</b></h3> : null}
                {r.rating == 2 ? <h3><b>REGULAR</b></h3> : null}
                {r.rating == 1 ? <h3><b>MALO</b></h3> : null}
            <h6>{r.descripcion}</h6>    
                {
                   [...Array(5)].map((star, index) => {
                        return (
                            <FaStar 
                            size={25} 
                            // color={index  + 1 <= (r.rating) ? "#ffc107" : "#e4e5e9" }
                            color={index  + 1 <= (r.rating) ? "#ffc107" : "#e4e5e9" }  
                            key={index}
                            />

                        )
                   } )    
                }
                
            </div>
        ))}
        </div>
    </div>  
  )
}
