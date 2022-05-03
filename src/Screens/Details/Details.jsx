import React, { createRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {getProductById} from "../../Actions/products.js"
import { addItem } from "../../Actions/cart.js";
import "./Details.css"
import BotonPago from "../../Components/BtnPago/BtnPago.jsx";
import { WhatsApp } from "../../Actions/whatsApp.js";
import Swal from 'sweetalert2'
import Carousel from "../../Components/Carousel/Carousel.jsx";
export default function Detail() {
  
  const { idProduct } = useParams();
  const dispatch = useDispatch()
  let myRef = createRef()
  const product = useSelector((state) => state.productsReducer.detailProduct);

  let [index, setIndex] = useState(0)

  useEffect(() => {
    dispatch(getProductById(idProduct))
  }, [idProduct])

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
    console.log(idProduct)
    dispatch(addItem(parseInt(idProduct)));
    
    Swal.fire({
      
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };
 
  
  if(product.title) {
  return ( 
      <>
            <div class="containerDetail">
                <div class="thumb2" ref={myRef}>
                  {product?.images.map( (img, index) => (
                    <img src={img} alt="product" key={index}
                    onClick={()=> handleTab(index)}
                    />
                  ))}
                </div>
              <div class="bigImg">
                  <img src={product?.images[index]} alt="product " />

              </div>
              <div class="detailBox">
                <h1><b>{product?.title}</b></h1>
                <h4><b>${product?.price}</b></h4>
                <br />  
                <p><b>Description:</b> {product?.description}</p>
                <span><b>Size:</b> {product?.size}</span> 
                <div class="btnGroup">
                      <div class="btnBerna">
                        <button class="btn btn-secondary" type='button' onClick={handleAdd}>Agregar al carrito</button>
                      </div>
                      <div class="btnBerna">
                        <button onClick={()=>handleWhatsApp(product.title, product.price)}class="btn btn-success">Preguntar al WhatsApp</button>
                      </div>
                </div>
               </div>
               <div class="recommended">
                 <Carousel category={product?.category} />
              </div>

            

            </div>

      </> 
     )
  }else {
    return (<h1>Loading...</h1>)
  }
}