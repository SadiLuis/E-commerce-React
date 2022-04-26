import React from 'react'
import {useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getAllProducts, cleanUp} from '../../Actions/products';
import Card from '../../Components/Card/Card';
import './Home.module.css'
import styles from './Home.module.css'
import icon from '../../Assets/cart.svg'
import Paging from '../../Components/Paging/Paging';
import ShoppingBtn from '../../Components/Shopping/ShoppingBtn';


export default function Home() {
  
  const dispatch = useDispatch()

React.useEffect(()=>{
  dispatch(getAllProducts())
  return () => {
    dispatch(cleanUp())
  };
  },[])



  

  const allProducts = useSelector((state) => state.productsReducer.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsOnPage, setProductsOnPage] = useState(6)
  const indexLastProduct = currentPage * productsOnPage
  const indexFirstProduct = indexLastProduct - productsOnPage
  const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)


const paginado = (pageNum) => {
  setCurrentPage(pageNum)
}

  
  return (
    <div className='container-fluid'>
      Home
      <div className={styles.cart} >
      <ShoppingBtn className={styles.icon}/>
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
        currentProducts?.map(e=> <Card  key={e.id} id={e.id}  img={e.images[0]} title={e.title} category={e.category} price={e.price}/> 
        ) 
      }
     
     </div>
     
      
      </div>
  )
}
