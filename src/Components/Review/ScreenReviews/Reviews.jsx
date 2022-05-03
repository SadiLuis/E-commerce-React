import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentByProductId } from '../../../Actions/Comments'
import { FaStar } from 'react-icons/fa'



export default function Review({idProduct}) {
    //let idProduct = 13
    const dispatch = useDispatch()

    const reviews = useSelector((state) => state.commentReducer.comentariosProducto)
    console.log("reviews", reviews)

    useEffect(() => {
        dispatch(getCommentByProductId(idProduct))
    }, [idProduct])

  return (
    <>
        { reviews?.map((r) => (
            <div>
                {r.rating == 5 ? <h3>EXCELENTE</h3> : null}
                {r.rating == 4 ? <h3>MUY BUENO</h3> : null}
                {r.rating == 3 ? <h3>BUENO</h3> : null}
                {r.rating == 2 ? <h3>REGULAR</h3> : null}
                {r.rating == 1 ? <h3>MALO</h3> : null}
                {
                   [...Array(5)].map((star, index) => {
                        return (
                            <FaStar 
                            size={70} 
                            color={index  + 1 <= (r.rating) ? "#ffc107" : "#e4e5e9" }  

                            />

                        )
                   } )    
                }
                <h6>{r.descripcion}</h6>
            </div>
        ))}
    </>  
  )
}
