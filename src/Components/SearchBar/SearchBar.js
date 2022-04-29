import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { searchByName } from "../../Actions/products";
import styles from "./SearchBar.module.css"

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    //console.log("input search", name)
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "No se encontró el producto!",
      });
      //alert("Escriba el producto que desea buscar");
    }
    dispatch(searchByName(name));
    setName("");
  }
  return (
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
  );
}
export default SearchBar