import React from 'react'
import './Card.module.css'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addItem , addItemCart} from '../../Actions/cart'
import styles from './Card.module.css'
import Swal from "sweetalert2";

export default function Card({img, title,category, price, id }){
const dispatch = useDispatch();
const idCart = useSelector(state => state.productsReducer.idCart )
    const handleAdd =  () => {
        console.log(id)
       dispatch(addItem(id));
       const cart={
         id,
         quantity:1
       }
      if(idCart) addItemCart(cart, idCart.id)
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          showConfirmButton: false,
          timer: 1500,
        });
      };


    return (
    
    <div className={styles.card} style={{"maxWidth": "90%"}}>
        <Link to={`/detail/${id}`}>
        <img className="card-img-top" src={img}></img>
        </Link>
        
        <div className= "card-body"></div>
        <Link to={`/detail/${id}`}>
        <h3 className="card-title">{title}</h3>
        </Link>
        <p className="card-text"> category: {category}</p>
        <p><b>${price}</b></p>
        <button onClick={ handleAdd} className='btn btn-outline-dark'>Agregar al carrito</button>
    </div>
    )
}