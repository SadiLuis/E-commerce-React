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
        end: 4
    })
    
    useEffect(() => {
        dispatch(getProductsByCat(idCategory))   
    }, [idCategory])

    

    function handleNext() {
        
        let auxInit = interval.init
        let auxEnd= interval.end
        setInterval({
            init: auxInit + 4,
            end: auxEnd + 4
        })
        
    }

    function handlePrev(){
        let auxInit = interval.init
        let auxEnd= interval.end
        setInterval({
            init: auxInit - 4,
            end: auxEnd - 4
        })
    }

    console.log("init", interval.init)
    console.log("end", interval.end)
     
  if (recommendedProducts.length > 0) {
      return (
          
            <div class="container">
                <h2 class="text-start-bold">Mas productos de la categoría {category} que podrían interesarte</h2>
                {/* <!-- Slider --> */}
                

                <div class="containerCarousel">
                <button disabled={interval.init > 0  ? false : true}  onClick={()=> handlePrev()} class="btnPrev"><BsArrowLeftCircle size={40}/></button>
                     {recommendedProducts?.slice(interval.init, interval.end).map( (product) => (
                        <div class="carouselCards" key={product.id} >         
                        <CardCarousel 
                            
                            title={product.title}      
                            category={product.category}
                            price={product.price}
                            img={product.images[0]} 
                            id = {product.id}
                        />
                        </div>
                     ))}
                <button disabled={interval.end < recommendedProducts.length  ? false : true} onClick={()=>handleNext()}class="btnNext"><BsArrowRightCircle size={40}/></button>
     
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