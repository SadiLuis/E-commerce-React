import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCat } from '../../Actions/products'
import CardCarousel from './CardCarousel'
import "./Carousel.css"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import axios from 'axios'
import { BASEURL } from '../../Assets/URLS'



function Carousel({idCategory, category}) {
    
    
    const dispatch = useDispatch()
    const [recommendedProducts, setRecommendedProducts] = useState([])
    //let recommendedProducts = useSelector((state) => state.productsReducer.sameCategory)
    let [interval, setInterval] = useState({
        init: 0,
        end: 4
    })
    
    useEffect(() => {
        if(idCategory && idCategory>0) {
        const getProducts = async() => {
        try {
            var res = await axios.get(`${BASEURL}/products/category/${idCategory}`)
            setRecommendedProducts(res.data)
            console.log("reco", recommendedProducts)
        }catch(err){
            console.log(err)
        }
    };
        
        getProducts()
    }    
    }, [idCategory])

    // useEffect(() => {
    //     var json = await axios.get(`${BASEURL}/products/category/${idCategory}`)
    //     dispatch(getProductsByCat(idCategory))   
    // }, [idCategory])

    

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
                <h1>No encontramos productos en la misma categoria </h1>
        )
  }  
 
}

export default Carousel