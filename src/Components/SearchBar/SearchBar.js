import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { searchByName } from "../../Actions/products";
import styles from "./SearchBar.module.css";
import {Link} from 'react-router-dom'


function SearchBar({setPage, setOrigin}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const products = useSelector((state) => state.productsReducer.searchProducts);
  //console.log("origen", setOrigin)
  //console.log("productos", products)
  function handleInputChange(e) {
    const searchWord = e.target.value;
    setName(searchWord);
    e.preventDefault();
    const newFilter = products.filter((el) =>{
      return el.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if(searchWord === ""){
      setFilteredData([]);
    }else{
      setFilteredData(newFilter)
    }
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "No se encontró el producto!",
      });
      //alert("Escriba el producto que desea buscar");
    }
    setPage(1)
    dispatch(searchByName(name));
    setName("");
    setFilteredData([]);
  }
  return (
    <div className={styles.search}>
    <div className={styles.buscador} >
      <input
        className="form-control me-2"
        type="text"
        placeholder="Buscar..."
        onChange={handleInputChange}
        value={name} 
       
      />

      <button 
        type="submit"
        className="btn btn-outline-success"
        onClick={handleSubmit}
        
      >
        Buscar
      </button>
      </div>
      {filteredData.length != 0 &&(
        <div className={styles.dataResult}>
          {filteredData.map((el) => {
          return(
            <a className={styles.dataItem}>
              {setOrigin === "user" ?
             <Link style={{textDecoration:"none", color: "black", padding:"10px"}} to={`/detail/${el.id}`}>
               <span><img className={styles.imagen} src={el.images[0]}/></span>
              <span className={styles.title}>{el.title}</span>
             </Link> 
             : <Link style={{textDecoration:"none", color: "black", padding:"10px"}} to={`/dashboard/admin/EditProduct/${el.id}`}>
                <span><img className={styles.imagen} src={el.images[0]}/></span>
                <span className={styles.title}>{el.title}</span>
              </Link>
            }
            </a>
          )
          })}
        </div>      
      )}
    </div>
  );
}
export default SearchBar