import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductById } from "../../Actions/products";
import styles from './FavCard.module.css'
import { Link } from "react-router-dom";
import { deleteFav } from "../../Actions/Favs";
export default function FavCard ({id}) {
const dispatch = useDispatch()

React.useEffect(()=> {
        dispatch(getAllProducts())
    }, [id])

const products = useSelector((state)=> state.productsReducer.products)
const array = products.filter(e=> e.id === id)

const handleDelete = (id) => {
    dispatch(deleteFav(id))
    window.location.reload()
}

    return(
        <div className={styles.container}>
             {
                 array.length && <div className={styles.card}>
                
                 <div className={styles.imgBx}>
                    <img src={array[0].images[0]} style={{width:'70px'}}></img>
                 </div>
                <div className={styles.contentBx}>
                <Link to={`/detail/${array[0].id}`}><h4>{array[0].title}</h4></Link>
                 <p><b>${array[0].price}</b></p>
                 <button className="btn btn-outline-dark" onClick={()=> handleDelete(array[0].id)}>Eliminar</button>
                </div>
                

                 </div>
                
             }
             
        
        </div>
    )
}