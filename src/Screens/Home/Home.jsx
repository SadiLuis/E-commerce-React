import React, { useEffect } from 'react'
import {useState} from 'react'
import { getAllProducts, cleanUp, orderByPrice,
  orderByRate, getCategories, filterByCategory} from '../../Actions/products';
import Card from '../../Components/Card/Card';
import { useDispatch,useSelector } from "react-redux";
import styles from './Home.module.css'
import icon from '../../Assets/cart.svg'
import Paging from '../../Components/Paging/Paging';
import SearchBar from '../../Components/SearchBar/SearchBar';
//import{FormGroup, Label} from "react-bootstrap"
import ShoppingBtn from '../../Components/Shopping/ShoppingBtn';
import productsReducer from '../../Reducers/Products';



export default function Home() {
  
  const dispatch = useDispatch()

React.useEffect(()=>{
  dispatch(getAllProducts())
  return () => {
    dispatch(cleanUp())
  };
  },[])
  useEffect(()=>{
    dispatch(getCategories())
  }, [dispatch])



  
  
  const allProducts = useSelector((state) => state.productsReducer.products)
  console.log(allProducts)
  const categories= useSelector((state)=>state.productsReducer.categories)
  console.log(categories)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsOnPage, setProductsOnPage] = useState(6)
  const indexLastProduct = currentPage * productsOnPage
  const indexFirstProduct = indexLastProduct - productsOnPage
  const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)


const paginado = (pageNum) => {
  setCurrentPage(pageNum)
}


  

///////////////
function handleClick(e) {
  //resetea para que traiga todos los produtos de nuevo cuando se buggea
  e.preventDefault();
  getAllProducts();
}

// function handleFilterByCategories(e) {
//   e.preventDefault();
//   filterByCategory(e.target.value);
// }

function handleOrderByPrice(e) {
  e.preventDefault();
  dispatch(orderByPrice(e.target.value));
}

// function handleOrderByRate(e) {
//   e.preventDefault();
//   orderByRate(e.target.value);
// }

// const nextPage = () => {
//   if (indexOfLastProduct < filtered.length) {
//     setCurrentPage((prev) => prev + 1);
//   }
// };
// const previousPage = () => {
//   if (indexOfFirstProduct > 0) {
//     setCurrentPage((prev) => prev - 1);
//   }
// };
  return (
    <div>
    
      <form className="d-flex">

        <SearchBar />
      </form>
      <div className={styles.filtroPrecio} >
                <label>PRECIO</label>
                <select className={styles.selectors} onChange={handleOrderByPrice}>
                  <option value="asc">Menor precio</option>
                  <option value="desc">Mayor precio</option>
                </select>
              </div>
    
    
          <div>
      <div className='container-fluid'>

        {/* <div className={styles.cart}>
      <p><b>{cartSize}</b></p>
      <img src={icon} className={styles.icon} alt="cart.svg" />
    </div> */}
        {/* <div>
      <h1>FILTROS Y ORDENAMIENTOS - SIN FILTROS</h1>
      <div className={styles.title}><h4>Nuestros Productos</h4></div>
      <div className={styles.contain_btn_products}><button className='btn btn-outline-success' onClick={handleClick}>
        Sin Filtros
      </button></div>

      


        <div>
         <h1>Filtro por Categoría</h1>
        <div className={styles.fillCategory}>
          <label className={styles.label}>CATEGORIA</label>
          <select
            className={styles.selectors}
            name="filterbycategories"
            defaultValue={"default"}
            onChange={(e) => handleFilterByCategories(e)}
          >
            <option value="all">Todas</option>
            {categories?.map((category) => {
              return (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              );
            })}
          </select>
         </div>
         </div>   */}


        {/* <div className='form-check'>
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
<label class="form-check-label" for="flexRadioDefault1">
Sillas
</label>
    </div> */}

        {/* </div>
    <div className={styles.pagination}>
      <Paging
        productsOnPage={productsOnPage}
        allProducts={allProducts.length}
        paginado={paginado} />
    </div>




    <div className={styles.row}>


      {currentProducts?.map(e => <Card key={e.id} id={e.id} onClick={handleCart} img={e.images[0]} title={e.title} category={e.category} price={e.price} />
      )}

    </div>


  </div> */}
        {/* </div>
) */}
               



        <div className='container-fluid'>

          {/* <div className={styles.cart}>
            <ShoppingBtn className={styles.icon} />
          </div> */}
          <div className={styles.pagination}>
            <Paging
              productsOnPage={productsOnPage}
              allProducts={allProducts.length}
              paginado={paginado} />
          </div>




          <div className={styles.row}>


            {currentProducts?.map(e => <Card key={e.id} id={e.id} img={e.images[0]} title={e.title} category={e.category} price={e.price} />
            )}

          </div>


        </div>
      </div>
       </div>
       </div>
   
  )
  
}
