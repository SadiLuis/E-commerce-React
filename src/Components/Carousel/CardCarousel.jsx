
import React from 'react'
import "./Carousel.css"
import {useDispatch, useSelector} from 'react-redux'
import { addItem} from '../../Actions/cart'
import Swal from "sweetalert2";
import { getUserDetail} from '../../Actions/Auth';
import { postFav } from "../../Actions/Favs.js";
import { MdAddShoppingCart, MdFavorite } from 'react-icons/md';
function CardCarousel({title, category, price, img, id}) {
  
    const dispatch = useDispatch()

  
    
   
  
    const myUser = useSelector((state)=> state.loginReducer.userDetail)

    const handleCart =  () => {
        
       dispatch(addItem(id));
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          showConfirmButton: false,
          timer: 1000,
        });
      };
      const handleFav = () => {
  
        let body = {
         usuarioId: myUser?.id,
         productoId: id
        }
       dispatch(postFav(body))  
       
      }

    




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
      
    <span><button onClick={()=> handleCart()} className="btn btn-outline-dark"><MdAddShoppingCart></MdAddShoppingCart></button></span> 
   {myUser && <span><button className="btn btn-outline-danger" onClick={() => handleFav()}><MdFavorite></MdFavorite></button></span>}
      
    </div>
  </div>
  
</div>
  )
}

export default CardCarousel