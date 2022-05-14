import React, { createRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {getProductById} from "../../Actions/products.js"
import { addItem } from "../../Actions/cart.js";
import styles from "./Details.module.css"
import BotonPago from "../../Components/BtnPago/BtnPago.jsx";
import { WhatsApp } from "../../Actions/whatsApp.js";
import Swal from 'sweetalert2'
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Review from "../../Components/Review/ScreenReviews/Reviews.jsx";
import { getUserDetail} from '../../Actions/Auth';
import { postFav } from "../../Actions/Favs.js";
import animate from "animate.css"
import { Loader } from "../../Components/Loader/Loader.jsx";



export default function Detail() {
  
  const { idProduct } = useParams();
  const dispatch = useDispatch()
  let myRef = createRef()
  const product = useSelector((state) => state.productsReducer.detailProduct);

  let [index, setIndex] = useState(0)

  useEffect(() => {
    dispatch(getProductById(idProduct))
    dispatch(getUserDetail())
  }, [idProduct])
  const myUser = useSelector((state)=> state.loginReducer.userDetail)

  const handleTab = (index) => {
    setIndex(index)
    const images = myRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "")
    }
    images[index].className= "active"
  }

  const handleWhatsApp = (title, price) => {
      dispatch(WhatsApp(title, price))
  }


  const handleAdd =  () => {
    //console.log(idProduct)
    dispatch(addItem(parseInt(idProduct)));
    
    Swal.fire({
      
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleFav = () => {
  
     let body = {
      usuarioId: myUser.id,
      productoId: product?.id
     }
    dispatch(postFav(body))  
     Swal.fire({
      
      icon: "success",
      title: "Producto agregado a favoritos",
      showConfirmButton: false,
      timer: 1500,
    });
   }
    
  
  
  
  if(product.title) {
  return ( 
      <>
      
      
      {
        //product && console.log('producto: ' ,product)
      }
            
            <div className={styles.containerDetail}>
                <div className={styles.thumb2} ref={myRef}>
                  {product?.images.map( (img, index) => (
                    <img src={img} alt="product" key={index}
                    onClick={()=> handleTab(index)}
                    />
                  ))}
                </div>
                
              <div className={styles.bigImg}>
                  <img src={product?.images[index]} alt="product " />

              </div>
              
              <div className={styles.detailBox}>
                <h1><b>{product?.title}</b></h1>
                <h4><b>${product?.price}</b></h4>
                <br />  
                <p><b>Descripcion:</b> {product?.description}</p>
                <span><b>Dimensiones:</b> {product?.size}</span> 
                <div className={styles.btnGroup}>
                  {product?.statusProduct && product?.cantidad>0 && (
                    <div className="btnBerna">
                    <button className="btn btn-secondary me-1" type='button' onClick={handleAdd}>Agregar al carrito</button>
                  </div>
                  )}
                      
                      <div className="btnBerna">
                        <button onClick={()=>handleWhatsApp(product.title, product.price)} className="btn btn-success me-1">Preguntar al WhatsApp</button>
                      </div>
                      <div className="btnFav">
                        <button className="btn btn-warning" onClick={() => handleFav()}>Agregar a favoritos</button>
                      </div>
                </div>
                {product?.statusProduct && product?.cantidad>0
                  ?(<h6 className="animate__animated animate__slideInRight animate__animated animate__fadeOutLeft text-primary fw-bold">Una vez confirmada la compra, un representante de MOBI se contactará con usted para definir los detalles de su producto</h6>)
                  :(<span className="text-danger fw-bold">Producto no disponible</span>)                
                }
                
               </div>
               <div className={styles.recommended}>
                 <Carousel category={product?.category} />
              </div>

              <div className={styles.comentariosProducto}>
                    <Review
                    idProduct={product?.id}
                    />
              </div>

            

            </div>

      </> 
     )
  }else {
    return (<Loader/>)
  }
}