
import React from 'react'
import "./Carousel.css"
import {useDispatch} from 'react-redux'
import { addItem} from '../../Actions/cart'
import Swal from "sweetalert2";

function CardCarousel({title, category, price, img, id}) {
  
    const dispatch = useDispatch()
    
    const handleCart =  () => {
        
       dispatch(addItem(id));
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          showConfirmButton: false,
          timer: 1000,
        });
      };


    return (
    
<div className="carouselCard" >
  <a href={`/detail/${id}`}>  
  <img src={img} className="card-img-top" alt="..." height={150}/>
  </a>
  
  <div className="card-body">
    <a href={`/detail/${id}`}> 
        <h5 className="card-title">${price}</h5>
        <p className="card-text"><b>{title}</b></p>
    </a>    
    <div className="carouselBtn">
    <button onClick={()=> handleCart()} className="btn btn-outline-dark">Agregar al carrito</button>
    </div>
  </div>
  
</div>
  )
}

export default CardCarousel