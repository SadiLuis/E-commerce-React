
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
    
<div class="carouselCard" >
  <a href={`/detail/${id}`}>  
  <img src={img} class="card-img-top" alt="..." height={150}/>
  </a>
  
  <div class="card-body">
    <a href={`/detail/${id}`}> 
        <h5 class="card-title">${price}</h5>
        <p class="card-text"><b>{title}</b></p>
    </a>    
    <div class="carouselBtn">
    <button onClick={()=> handleCart()} class="btn btn-outline-dark">Agregar al carrito</button>
    </div>
  </div>
  
</div>
  )
}

export default CardCarousel