import React, { useEffect, useState } from 'react'
import { getUserDetail, updateUser} from '../../Actions/Auth';
import { useSelector, useDispatch } from "react-redux";
import { Loader } from '../../Components/Loader/Loader'
import styles from './Profile.module.css'
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { validation } from "./validation";

export default function Editprofile(){
    
  const theuser = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  React.useEffect(()=> {
    dispatch(getUserDetail())
    
  }, [dispatch])
  
   console.log("user", theuser)
   
   useEffect(() => {
    setInput({
      name: theuser?.nombre,
      avatar: theuser?.avatar,
      country: theuser?.pais,
      province: theuser?.provincia,
      address: theuser?.direccion,
      phone: theuser?.telefono,
      city: theuser?.ciudad,
      
    });
  }, [theuser]);

  const [input, setInput] = useState({
    name: theuser?.nombre,
    avatar: theuser?.avatar,
    country: theuser?.pais,
    province: theuser?.provincia,
    address: theuser?.direccion,
    phone: theuser?.telefono,
    city: theuser?.ciudad,
  });

  const [focus, setFocus] = useState({
    name: false,
    avatar: false,
    country: false,
    province: false,
    address: false,
    phone: false,
    city: false,
  })
  const [error, setError] = useState({})

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
      setInput(input)
      let body = {id: theuser?.id, 
                  nombre: input.name, 
                  avatar: input.avatar, 
                  pais: input.country, 
                  ciudad: input.city,
                  provincia: input.province,
                  direccion: input.address,
                  telefono: input.phone
                  }
      dispatch(updateUser(body))
      Swal.fire({
        text: `Perfil actualizado con éxito!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate('/profile')
    }

  }


  const handleChange = (name, value) => {
    //console.log(input)
    const newform = { ...input, [name]: value };
    if (typeof value === 'string' || typeof value === 'array') {
      setInput(newform);
      const errors = validation(newform);
      //console.log("error", errors)
      setError(errors);
    }
    else {
      setFocus({ ...focus, [name]: value })
    }
    return newform;
  }
  let img = "";
  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", 'preset_pabs');
      //console.log("img", formData)
      const newAxios = Axios.create();
      newAxios
        .post(
          'https://api.cloudinary.com/v1_1/herway-app/image/upload',
          formData
        )
        .then((res) => {
          img = res.data.secure_url
          setInput({
            ...input,
            avatar: img,
          });
        });
    }
  };

console.log("input", input)

  if(!theuser){
    return <Loader/>
  }else{
  return (
    <div className='container-fluid'>
      <div className="row">
        

        <div className="col-10">
          <form
            onSubmit={handleSubmit}
          >
            <h2 className="titulo">Editar Perfil de Usuario</h2>
            <div className={` text-center ${styles.profilePicDiv}`}>
                      <img src={input.avatar} className={` ${styles.profileImg} `}  alt="avatar" onChange={(e) => handleChange(e.target.name, e.target.value)}></img>
                      <br/>
                      
                       <input 
                       type="file"
                       multiple
                       onChange={(e) => {
                         uploadImage(e.target.files);
                       }}
                       />
                      </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='name'
                value={input.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.name && error.name && <strong style={{color: "red", margin:"10px"}}>{error.name}</strong>}
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Dirección</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='address'
                value={input.address}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.address && error.address && <strong style={{color: "red", margin:"10px"}}>{error.address}</strong>}
            </div>  
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Ciudad</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='city'
                value={input.city}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.city && error.city && <strong style={{color: "red", margin:"10px"}}>{error.city}</strong>}
              <span className="input-group-text" id="basic-addon1">Provincia</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='province'
                value={input.province}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.province && error.province && <strong style={{color: "red", margin:"10px"}}>{error.province}</strong>}
            </div>    
            <div className="input-group mb-3">  
              <span className="input-group-text" id="basic-addon1">Pais</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='country'
                value={input.country}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.country && error.country && <strong style={{color: "red", margin:"10px"}}>{error.country}</strong>}
              <span className="input-group-text" id="basic-addon1">Teléfono</span>
              <input onFocus={(e) => handleChange(e.target.name, true)}
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name='phone'
                value={input.phone}
                onChange={(e) => handleChange(e.target.name, e.target.value)}>
              </input>
              {focus.phone && error.phone && <strong style={{color: "red", margin:"10px"}}>{error.phone}</strong>}
            </div>
            <div>
              <button
                text="Create Product"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-outline-dark"
                >Actualizar Perfil
                
              </button>
              <Link to={`/profile`}> <button className='btn btn-outline-dark'>Cancelar</button></Link>
            </div>
          </form>
         </div>
      </div>
    </div>   

  )
  } 
}