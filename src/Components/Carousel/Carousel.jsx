import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCat } from '../../Actions/products'
import CardCarousel from './CardCarousel'
import "./Carousel.css"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";



function Carousel({category}) {
    // HardCode MAL
    
    let idCategory = 0
    if (category === "Sillas") idCategory = 1
    if(category === "Sillones") idCategory = 2
    if(category === "Mesas") idCategory = 3
    if(category === "Iluminacion") idCategory = 4
    if(category === "Exterior") idCategory = 5
    
    const dispatch = useDispatch()
    let recommendedProducts = useSelector((state) => state.productsReducer.sameCategory)

    let [interval, setInterval] = useState({
        init: 0,
        end: 3
    })
    
    useEffect(() => {
        dispatch(getProductsByCat(idCategory))   
    }, [idCategory])

    

    function handleNext() {
        
        let auxInit = interval.init
        let auxEnd= interval.end
        setInterval({
            init: auxInit + 3,
            end: auxEnd + 3
        })
        
    }

    function handlePrev(){
        let auxInit = interval.init
        let auxEnd= interval.end
        setInterval({
            init: auxInit - 3,
            end: auxEnd - 3
        })
    }

     
  if (recommendedProducts.length > 0) {
      return (
          
            <div className="container">
                <h2 className="titulo">Mas productos de la categoría <b>{category}</b> que podrían interesarte</h2>
                {/* <!-- Slider --> */}
                

                <div className="containerCarousel">
                <button disabled={interval.init > 0  ? false : true}  onClick={()=> handlePrev()} className="btnPrev"><BsArrowLeftCircle size={40}/></button>
                     {recommendedProducts?.slice(interval.init, interval.end).map( (product) => (
                        <div className="carouselCards" key={product.id} >         
                        <CardCarousel 
                            
                            title={product.title}      
                            category={product.category}
                            price={product.price}
                            img={product.images[0]} 
                            id = {product.id}
                        />
                        </div>
                     ))}
                <button disabled={interval.end < recommendedProducts.length  ? false : true} onClick={()=>handleNext()}className="btnNext"><BsArrowRightCircle size={40}/></button>
     
                </div>        

            </div>
                            
            )
  }else {
    return (
                <h1>Loading...</h1>
        )
  }  
 
}

export default Carousel