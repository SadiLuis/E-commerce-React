import React, { createRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {getProductById} from "../../Actions/products.js"
import { addItem } from "../../Actions/cart.js";
import "./Details.css"
import BotonPago from "../../Components/BtnPago/BtnPago.jsx";
import { WhatsApp } from "../../Actions/whatsApp.js";
import Swal from 'sweetalert2'
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
    
    <div className="details">
      <div className="big-img">
            
            <img src={product?.images[index]} alt="product " />
            
            <div className="thumb" ref={myRef}>
              {product?.images.map( (img, index) => (
                <img src={img} alt="product" key={index}
                onClick={()=> handleTab(index)}
                />
              ))}
            </div>
      
      </div>

       <div className="box">
             <div className="row">
               <h2>{product?.title}</h2>
               <span>${product?.price}</span>
               <br />
               <p><b>Descripcion:</b> {product?.description}</p>
               <p><b>Medidas:</b> {product?.size}</p>
               <p><b>Stock:</b> {product?.cantidad} unidades </p>
               
              {/* <div class="btnGroup"> */}
              <button class="cart btn btn-outline-secondary" type='button' onClick={handleAdd}>Agregar al carrito</button>
              <br />
              <button onClick={()=>handleWhatsApp(product.title, product.price)}class="cart btn btn-outline-success">Preguntar al WhatsApp</button>
              <br />
              <BotonPago 
              price={product.price}
              />
              {/* </div>    */}
             
             </div>
       </div>

       
        
        

     </div> 
     )
  }else {
    return (<h1>Loading...</h1>)
  }
}