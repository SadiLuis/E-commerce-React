
import React from 'react'
import "./Carousel.css"
import {useDispatch, useSelector} from 'react-redux'
import { addItem} from '../../Actions/cart'
import Swal from "sweetalert2";
import { getUserDetail} from '../../Actions/Auth';
import { postFav } from "../../Actions/Favs.js";
function CardCarousel({title, category, price, img, id}) {
  
    const dispatch = useDispatch()

  
    
    React.useEffect(()=> {
      dispatch(getUserDetail())
    }, [])
  
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
        Swal.fire({
         
         icon: "success",
         title: "Producto agregado a favoritos",
         showConfirmButton: false,
         timer: 1500,
       });
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
    <button onClick={()=> handleCart()} className="btn btn-outline-dark">Agregar al carrito</button>
    <button className="btn btn-warning" style={{marginTop:'1rem'}} onClick={() => handleFav()}>Agregar a favoritos</button>
    </div>
  </div>
  
</div>
  )
}

export default CardCarousel