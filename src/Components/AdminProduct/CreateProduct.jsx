import React, { createRef, useEffect, useState } from 'react'
import {postProduct} from "../../Actions/products"
import {getAllCategories} from "../../Actions/Category.js"
import { useSelector, useDispatch } from "react-redux";
import './EditProduct.css'
import Axios from "axios";
import icon from '../../Assets/pencil.svg'
import { validation } from "./validation";



export default function Product() {
  const dispatch = useDispatch()
  let myRef = createRef()
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const [errors, setErrors] = useState({});
  const [inputImages, setInputImages] = useState("");
  let [index, setIndex] = useState(0)
  
  const [input, setInput] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: [],
    cantidad: "",
  });
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postProduct(input));
    setInput({
      title: "",
      price: "",
      description: "",
      category: "",
      images: [],
      cantidad: "",
    });

    alert("Product Create!!");
  }
  console.log("categorias", categories)
   
  
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
  function handleSelectCategory(e) {
    setInput({
      ...input,
      category: e.target.value,
    });
  }
  function addImage(e) {
    /* console.log(e.target.value); */
    setInput({
      ...input,
      images: [...input.images, { url: inputImages, alt: "" }],
    });
    setInputImages("");
  }
  console.log("imagen", input.images)
  let arr = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", 'preset_pabs');
      console.log("img",formData)
      const newAxios = Axios.create();
      newAxios
        .post(
            'https://api.cloudinary.com/v1_1/herway-app/image/upload',
          formData
        )
        .then((res) => {
          arr.push(res.data.secure_url);
          setInput({
            ...input,
            images: [...input.images, arr[0] ],
          });
        });
    }
  };
  function handleDeleteImage(e) {
    e.preventDefault();
    setInput({
      ...input,
      images: input.images.flat().filter((name) => name.url !== e.target.name),
    });
  }
 
    return (
    <div className='container-md'>
        <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
      <h2 className="titulo">Crear Producto</h2>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" 
            class="form-control" 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            
            name='title'
            value={input.title}
            onChange={(e) => handleChange(e)}>
            </input>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Categoría</span>
            <span class="form-control">{input.category}</span>
            <select class="form-select" aria-label="Default select example" onChange={(e) => handleSelectCategory(e)}>
              <option hidden selected>Seleccionar categoría</option>
              {categories?.map((category) => (
                            <option value= {category.id}>{category.nombre}</option>
                        ))}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text">Descripción</span>
            <textarea 
            class="form-control" 
            aria-label="With textarea"
            name='description'
            value={input.description}
            onChange={(e) => handleChange(e)}
            ></textarea>
        </div>
        <div className="thumb" ref={myRef}>
              {input.images?.map( (img, index) => (
                <img src={img} alt="product" key={index}
                onClick={()=> handleTab(index)}
                />
              ))}
        </div>
        <div>
                  <label>Imagenes</label>
                  <div>
                    <input
                      
                      type="text"
                      placeholder="URL..."
                      value={inputImages}
                      onChange={(e) => setInputImages(e.target.value)}
                    />
                    <img
                      className="cursor-pointer"
                      onClick={(e) => addImage(e)}
                      
                      alt=""
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        uploadImage(e.target.files);
                      }}
                    ></input>
                  </div>
                  <div className="flex">
                    {input.images &&
                      input.images.flat().map((name) => {
                        return (
                          <div>
                            <img
                              
                              src={name.url}
                              alt={name.url}
                            />
                            <button
                              
                              name={name.url}
                              onClick={(name) => handleDeleteImage(name)}
                            >
                              X
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Precio</span>
            <input type="text" 
            class="form-control" 
            placeholder="$ 0.00" 
            name='price'
            value={input.price}
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(e) => handleChange(e)}>
            </input>
        </div>
        {/*<div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Size</span>
            <input type="text" 
            class="form-control" 
            placeholder="ingrese tamaño/medidas" 
            name='size'
            value={input.size}
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(e) => handleChange(e)}>
            </input>
                    </div>*/}
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Stock</span>
            <input type="text" 
            class="form-control" 
            placeholder="ingrese stock" 
            name='cantidad'
            value={input.cantidad}
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(e) => handleChange(e)}>
            </input>
        </div>
        <button
        text="Create Product"
        type="submit"
        onClick={(e) => handleSubmit(e)}>Crear Producto
            
        </button>
        </form>
        {/*<div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Stock</span>
            <span class="form-control">{product?.cantidad}</span>
              </div>*/}
    </div>
    )
       
}