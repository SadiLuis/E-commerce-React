import React, { createRef, useEffect, useState } from 'react'
import {getProductById} from "../../Actions/products.js"
import {getAllCategories} from "../../Actions/Category.js"
import { useSelector, useDispatch } from "react-redux";
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import './EditProduct.css'
import icon from '../../Assets/pencil.svg'
import { useParams } from 'react-router-dom';
import { validation } from './validation';


export default function Product() {
  const { idProduct } = useParams();
  const dispatch = useDispatch()
  let myRef = createRef()
  const product = useSelector((state) => state.productsReducer.detailProduct);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const [errors, setErrors] = useState({});
  let [index, setIndex] = useState(0)
  
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  
  useEffect(() => {
    dispatch(getProductById(idProduct))
  }, [idProduct])
  console.log("product", product)
  console.log("categorias", categories)
  console.log("referencia", myRef)
  
  useEffect(() => {
    setInput({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      images: product.images,
      size: product.size,
      cantidad: product.cantidad,
    });
  }, [product]);

  const [input, setInput] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    images: product.images,
    size: product.size,
    cantidad: product.cantidad,
  });
  console.log("input", input)
  const handleTab = (index) => {
    setIndex(index)
    const images = myRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "")
    }
    images[index].className= "active"
  }
  /*function handleCategories(e){
    setInput({
        ...input,
        countryId: [...input.countryId, e.target.value]
    })
  }*/
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  if(product.title) {
    return (
      <>
      
      <div className="container-fluid">
        {/* <TopNavbarAdmin/> */}
        <div className="row">
          <div className="col-auto col-md-2 col-xl-2 px-0 ">
            <SidebarAdmin/>
          </div>
          <div className="col-10">
      <h2 className='titulo'>Editar Producto</h2>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" 
            class="form-control" 
            
            aria-label="Username" 
            aria-describedby="basic-addon1"
            value={input.title}
            onChange={(e) => handleChange(e)}>
            </input>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Categoría</span>
            <span class="form-control">{product?.category}</span>
            <select class="form-select" aria-label="Default select example">
              <option hidden selected>Modificar categoría</option>
              {categories?.map((category) => (
                            <option value= {category.id}>{category.nombre}</option>
                        ))}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text">Descripción</span>
            <textarea class="form-control" aria-label="With textarea">{product?.description}</textarea>
        </div>
        <div className="thumb" ref={myRef}>
              {product?.images.map( (img, index) => (
                <img src={img} alt="product" key={index}
                onClick={()=> handleTab(index)}
                />
              ))}
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Precio</span>
            <input type="text" class="form-control" placeholder={"$ " + product?.price} aria-label="Username" aria-describedby="basic-addon1"></input>
        </div>
        {/*<div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Stock</span>
            <span class="form-control">{product?.cantidad}</span>
              </div>*/}
             </div> 
    </div>
    </div>
    </>
    )
  }else {
    return (<h1>Loading...</h1>)
  }              
}