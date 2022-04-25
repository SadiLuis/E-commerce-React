import React from 'react'
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getAllProducts, cleanUp} from '../../Actions/products';
import Card from '../../Components/Card/Card';
import {useSelector} from 'react-redux'
import './Home.module.css'
import styles from './Home.module.css'
import icon from '../../Assets/cart.svg'
import Paging from '../../Components/Paging/Paging';


export default function Home() {
  
  const dispatch = useDispatch()

React.useEffect(()=>{
  dispatch(getAllProducts())
  return () => {
    dispatch(cleanUp())
  };
  },[])



  const [cartSize, setCartSize] = useState(0)

  const allProducts = useSelector((state) => state.productsReducer.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsOnPage, setProductsOnPage] = useState(6)
  const indexLastProduct = currentPage * productsOnPage
  const indexFirstProduct = indexLastProduct - productsOnPage
  const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)


const paginado = (pageNum) => {
  setCurrentPage(pageNum)
}

  function handleCart(e){
    setCartSize(cartSize + 1)
}
  return (
    <div className='container-fluid'>
      Home
      <div className={styles.cart}>
        <p><b>{cartSize}</b></p>
        <img src={icon} className={styles.icon} alt="cart.svg"/>
      </div>
        <div className={styles.pagination}>
              <Paging 
        productsOnPage={productsOnPage} 
        allProducts={allProducts.length} 
        paginado={paginado}

        />
        </div>
        
     
      
     
        <div className={styles.row}>
      
      
      {
        currentProducts?.map(e=> <Card  key={e.id} id={e.id} onClick={handleCart} img={e.images[0]} title={e.title} category={e.category} price={e.price}/> 
        ) 
      }
     
     </div>
     
      
      </div>
  )
}
