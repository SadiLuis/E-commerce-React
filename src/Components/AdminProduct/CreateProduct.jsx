import React, { createRef, useEffect, useState } from 'react'
import { postProduct } from "../../Actions/products"
import { getAllCategories } from "../../Actions/Category.js"
import { useSelector, useDispatch } from "react-redux";
import './EditProduct.css'
import Axios from "axios";
import icon from '../../Assets/pencil.svg'
import { validation } from "./validation";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';



export default function Product() {
  const dispatch = useDispatch()
  let myRef = createRef()
  const categories = useSelector((state) => state.categoriesReducer.categories);

  const [inputImages, setInputImages] = useState("");
  let [index, setIndex] = useState(0)

  const formulario = {
    title: "",
    price: "",
    description: "",
    size: "",
    categoriaId: "",
    images: [],
    cantidad: "",
  };
  const [focus, setFocus] = useState({
    title: false,
    price: false,
    description: false,
    size: false,
    categoriaId: false,
    images: false,
    cantidad: false,
  })
  const [inputsize, setInputsize] = useState({
    height: [],
    width: [],
    depth: [],
  });
  const [input, setInput] = useState(formulario)
  const [error, setError] = useState({})

  function handleChangeSize(e) {
    setInputsize({
      ...inputsize,
      [e.target.name]: e.target.value,
    });
  }
  input.size = (inputsize.height + "x").concat((inputsize.width) + "x").concat(inputsize.depth) + "cm"
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.keys(error).length) {

      Swal.fire({
        text: `Datos incorrectos , por favor verifique que los datos ingresados sean correctos`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    else {
      setInput(formulario)
      dispatch(postProduct(input))
      Swal.fire({
        text: `Producto creado con éxito!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    }

  }


  //console.log("input", input)
  const handleTab = (index) => {
    setIndex(index)
    const images = myRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "")
    }
    images[index].className = "active"
  }

  const handleChange = (name, value) => {

    const newform = { ...input, [name]: value };
    if (typeof value === 'string' || typeof value === 'array') {
      setInput(newform);
      const errors = validation(newform);
      console.log("error", errors)
      setError(errors);
    }
    else {
      setFocus({ ...focus, [name]: value })
    }
    return newform;
  }
  /*function handleSelectCategory(e) {
    setInput({
      ...input,
      categoriaId: e.target.value,
    });
  }*/
  function addImage(e) {
    setInput({
      ...input,
      images: [...input.images, { url: inputImages, alt: "" }],
    });
    
    setInputImages("");
  }
  //console.log("imagen", input.images)
  let arr = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", 'preset_pabs');
      console.log("img", formData)
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
            images: [...input.images, arr[0]],
          });
        });
    }
  };
  function handleDeleteImage(e) {
    e.preventDefault();
    setInput({
      ...input,
      images: input.images.flat().filter((name) => name !== e.target.name),
    });
  }

  return (
    <div className='container-fluid'>
      <div className="row min-vh-100">
        <div className="col-auto col-md-2 col-xl-2 px-0 ">
          <SidebarAdmin />
        </div>
        <div className='col-10'>
          <form
            onSubmit={handleSubmit}
          >
            <h2 className="titulo">Crear Producto</h2>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='title'
                value={input.title}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.title && error.title && <strong style={{color: "red", margin:"10px"}}>{error.title}</strong>}
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Categoría</span>
              <span className="form-control">{input.categoriaId}</span>
              <select className="form-select" aria-label="Default select example" name='categoriaId'
                onFocus={(e) => handleChange(e.target.name, true)}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
               {/*} onChange={(e) => handleSelectCategory(e)}>*/}
                <option hidden selected>Seleccionar categoría</option>
                {categories?.map((category) => (
                  <option value={category.id}>{category.nombre}</option>
                ))}
              </select>
              {focus.categoriaId && error.categoriaId && <strong style={{color: "red", margin:"10px"}}>{error.categoriaId}</strong>}
            </div>
            <div className="input-group">
              <span className="input-group-text">Descripción</span>
              <textarea onFocus={(e) => handleChange(e.target.name, true)}
                className="form-control"
                aria-label="With textarea"
                name='description'
                value={input.description}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              ></textarea>
              {focus.description && error.description && <strong style={{color: "red", margin:"10px"}}>{error.description}</strong>}
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Medidas</span>
              <span className="input-group-text" id="basic-addon1">Alto</span>
              <input type="number"
                className="form-control"
                placeholder="cm"
                name='height'
                value={inputsize.height}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChangeSize(e)}>
              </input>
              <span className="input-group-text" id="basic-addon1">Ancho</span>
              <input type="number"
                className="form-control"
                placeholder="cm"
                name='width'
                value={inputsize.width}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChangeSize(e)}>
              </input>
              <span className="input-group-text" id="basic-addon1">Profundidad</span>
              <input type="number"
                className="form-control"
                placeholder="cm"
                name='depth'
                value={inputsize.depth}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChangeSize(e)}>
              </input>
            </div>
            
            
            
            
            
            <div style={{margin:'1rem 0rem 1rem 0rem'}}>
              <label>Imagenes</label>
                <div className="thumb" ref={myRef}>
                  {input.images?.flat().map((img, index) => ( <div>

                    <img src={img} alt="product" key={index}
                      onClick={() => handleTab(index)}
                    />



              
                    <button

                        name={img}
                        onClick={(img) => handleDeleteImage(img)}
                        style={{position:'absolute', right:'0'} }className='btnX'
                            >
                          X
                        </button>
              
              </div>
              ))
          
          }
              
           {/*    {input.images &&
                  input.images.flat().map((name) => {
                    return (
                      <div className='loadImg'>
                       <img

                          src={name.url}
                          alt={name.url}
                          /> 
                        
                      </div>
                    );
                  })}
               <div className="flexFran"> 
                
               </div>  */}
            </div>
              {/*<div>
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
              </div>*/}
              <div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    uploadImage(e.target.files);
                  }}
                  style={{margin:'1rem 0rem 1rem 0rem'}}
                ></input>
              </div>
            </div>









            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Precio</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="number"
                class="form-control"
                placeholder="$ 0.00"
                name='price'
                value={input.price}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.price && error.price && <strong style={{color: "red", margin:"10px"}}>{error.price}</strong>}
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Stock</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="number"
                className="form-control"
                placeholder="ingrese stock"
                name='cantidad'
                value={input.cantidad}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.cantidad && error.cantidad && <strong style={{color: "red", margin:"10px"}}>{error.cantidad}</strong>}
            </div>
            <div>
              <button
                text="Create Product"
                type="submit"
                onClick={(e) => handleSubmit(e)}className='btn btn-outline-dark'>Crear Producto
                
              </button>
              <Link to={`/dashboard/admin`}> <button className='btn btn-outline-dark'>Cancelar</button></Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )

}