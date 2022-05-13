import React, { useEffect, useState } from 'react'
import {
  getAllProducts, cleanUp, orderByPrice,
  orderByRate, getCategories, filterByCategory, orderAlfabeticamente
} from '../../Actions/products';
import Card from '../../Components/Card/Card';
import { useDispatch, useSelector } from "react-redux";
import styles from './Home.module.css'
import icon from '../../Assets/cart.svg'
import Paging from '../../Components/Paging/Paging';
import SearchBar from '../../Components/SearchBar/SearchBar';
//import{FormGroup, Label} from "react-bootstrap"
import ShoppingBtn from '../../Components/Shopping/ShoppingBtn';
import CategoriasForm from '../../Components/Checkbox/CategoriasForm';
import { Loader } from '../../Components/Loader/Loader'
import { updateCart } from '../../Actions/cart';


export default function Home() {
 const [flag , setFlag] = useState(false)
  const dispatch = useDispatch()
  const categorias = useSelector((state) => state.productsReducer.categories)
  React.useEffect(() => {
    dispatch(updateCart())
    dispatch(getAllProducts())
    return () => {
      dispatch(cleanUp())
    };
  }, [])
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])





  const allProducts = useSelector((state) => state.productsReducer.products)

  
  const categories = useSelector((state) => state.productsReducer.categories)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [productsOnPage, setProductsOnPage] = useState(12)
  const indexLastProduct = currentPage * productsOnPage
  const indexFirstProduct = indexLastProduct - productsOnPage
  const productsEnabled =   allProducts.filter(s=>s.statusProduct===true)
  const currentProducts = productsEnabled.slice(indexFirstProduct, indexLastProduct)

  
  const paginado = (pageNum) => {
    setCurrentPage(pageNum)
  }




  ///////////////
  function handleClick(e) {
    //resetea para que traiga todos los produtos de nuevo cuando se buggea
    e.preventDefault();
    getAllProducts();
  }



  function handleOrder(e) {
    e.preventDefault();
    if (e.target.value === "A-Z" || e.target.value === "Z-A") {
      dispatch(orderAlfabeticamente(e.target.value));
    } else {
      dispatch(orderByPrice(e.target.value))
    }
  }


  return (
    <div className={styles.container}>

      <div className={styles.order}>

        {/* PAGINADO */}
        <div className={styles.pagination}>
          <Paging
            productsOnPage={productsOnPage}
            allProducts={productsEnabled.length}
            paginado={paginado} />
        </div>


        {/* SORT BTN */}
        <div className={styles.sort}>

          <div className={styles.filtroPrecio} >
            <select className={styles.selectors} onChange={handleOrder}>
              <option value="cero">Ordenar</option>
              <option value="asc">Menor precio</option>
              <option value="desc">Mayor precio</option>


              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>

        </div>


        {/* SEARCHBAR */}
        <div className={styles.search}>
          <form >
            <SearchBar setPage={setCurrentPage} />
          </form>
        </div>

      </div>






      {/* Filtros */}
      <div className={styles.filters}>
        <CategoriasForm setFlag={setFlag} categorias={categorias} setPage={setCurrentPage}/>
      </div>





      {/* GRILLA PRODUCTOS */}
      <div className={styles.grilla}>
        <div className={styles.grillaCards}>
          {
            allProducts.length 
              ? currentProducts.length>0
                ?currentProducts.map(e => <Card key={e.id} id={e.id} img={e.images[0]} title={e.title} category={e.category} price={e.price} />)
                :<p className='fs-1'>No se encontraron productos</p>
                : !allProducts.length && flag ? <h2>No se encontraron productos</h2> : <Loader />
          }

        </div>


      </div>


    </div>


  )

}
