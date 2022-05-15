import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {register} from '../../Actions/Auth'
import { validateEmail,validateTlf } from '../../Helpers/ValidateForm'
import AnimacionLetra from '../../Assets/ANIMACION/Letra/AnimacionLetra'
import Swal from 'sweetalert2'
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/img4.jpeg'
import { useDispatch ,useSelector} from 'react-redux'
import {IoEyeOff ,IoEye} from "react-icons/io5"
import style  from "./Register.module.css"
const formulario = {
  nombre: '',
  usuario: '',
  contrasena: '',
  email: '',
  pais: '',
  provincia: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  contrasenaConfirm: '',
 
}

 

const validateform = function (form) {
  const errors = {};
  if (!form.nombre.trim()) {
    errors.nombre = "Campo requerido";
  } else if (form.nombre.length < 4) {
    errors.nombre = "Mínimo 4 caracteres";
  } else if (form.nombre.length > 25) {
    errors.nombre = "Máximo 25 caracteres";
  }

  if (!form.usuario.trim()) {
    errors.usuario = "Campo requerido";
  } else if (form.usuario.length < 5) {
    errors.usuario = "Mínimo 5 caracteres";
  } else if (form.usuario.length > 15) {
    errors.usuario = "Máximo 15 caracteres";
  }

  if (!form.contrasena.trim()) {
    errors.contrasena = "Campo requerido";
  } else if (form.contrasena.length < 6) {
    errors.contrasena = "Mínimo 6 caracteres";
  }
  if (!form.contrasenaConfirm.trim()) {
    errors.contrasenaConfirm = "Campo requerido";
  } else if (form.contrasenaConfirm !== form.contrasena) {
    errors.contrasenaConfirm = "Las contraseñas deben coincidir";
  }

  if (!form.email.trim()) {
    errors.email = "Campo requerido";
  } else if (!validateEmail(form.email)) {
    errors.email = "Escriba un email válido";
  }

  if (!form.pais.trim()) {
    errors.pais = "Campo requerido";
  }

  if (!form.provincia.trim()) {
    errors.provincia = "Campo requerido";
  }

  if (!form.direccion.trim()) {
    errors.direccion = "Campo requerido";
  } else if (form.direccion.length < 10) {
    errors.direccion = "Mínimo 10 caracteres";
  } else if (form.direccion.length > 40) {
    errors.direccion = "Máximo 40 caracteres";
  }

  if (!form.telefono.trim()) {
    errors.telefono = "Campo requerido";
  } else if (!validateTlf(form.telefono)) {
    errors.telefono = "Escriba un número de telefono válido";
  }

  // if (form.confirm_contrasena !== form.contrasena) {
  //   errors.confirm_contrasena = "Las contraseñas no coinciden";
  // }
  if (!form.localidad) {
    errors.localidad = 'Debe ingresear la localidad donde reside'
}

  return errors;
};

export default function Register({socket}) {
  /* ANIMACION */
  const [letterClass, setLetterClass] = useState('text-animate')
  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5000)
  }, [])

//////////////////////////////////


  const isRegister = useSelector(state => state.loginReducer.isRegister)
  const [focus , setFocus] = useState({ 
  nombre: false,
  usuario: false,
  contrasena: false,
  email: false,
  pais: false,
  provincia: false,
  direccion: false,
  telefono: false,
  ciudad: false,
  })
  const [visible , setVisible] = useState('password')
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState(formulario)
  const [error, setError] = useState({})
  
  const dispatch = useDispatch()

  useEffect(() => {
    
    if (isRegister  ) {
      console.log(isRegister)
      Swal.fire({
        text: `Cuenta creada con éxito , inicie sesión para ingresar`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      
     return navigate("/login");
     
    }
  }, [isRegister, navigate]);

  const handleChange = (name, value) => {
    
    const newform = { ...form, [name]: value };
    if(typeof value === 'string'){
    setForm(newform);
    const errors = validateform(newform);
    setError(errors);
    } 
    else{
    setFocus({ ...focus, [name]: value })
    }
    return newform;
  }
 

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(Object.keys(error).length){
      
      Swal.fire({
        text: `Datos incorrectos , por favor verifique que los datos ingresados sean correctos`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    else{
    setForm(formulario)
    dispatch(register(form))
    //socket
    socket.emit("notif_newRegister", form)

    }

  }

  const mostrarPassword = () =>{
    console.log(visible)
    if(visible === 'password') setVisible('text')
    else setVisible('password')
  }

  return (
     <div className={`row g-0 pt-1 `}>
   <div lassName={` ${style.container}`}>
  <div className={style.containerReg}>
  <div className="col-sm-4">
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className= {`carousel-inner ${style.containerCarousel}`} style={{height: '62rem'}}>
        <div className={`carousel-item active  ${style.containerImg}`}>
          <img className={style.tamaño} src={uno} alt="First slide" />
        </div>
        <div className={`carousel-item   ${style.containerImg}`}>
          <img className={style.tamaño} src={dos} alt="Second slide" />
        </div>
        <div className={`carousel-item   ${style.containerImg}`}>
          <img className={style.tamaño} src={tres} alt="Third slide" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="title px-lg-5 pt-lg-4 pb-2 p-4">
      
    </div>
    <br />
    {/* <div class='px-lg-5r py-lg-4 p-4'></div> */}
    <h2>Registro</h2>
    {/* FORM LOGIN */}
    {/* <div className='col-md-4'>
      <div className='mt-5 ms-5'> */}
    {/* <h1 className='text-center'> REGISTRO </h1> */}
    <form onSubmit={handleSubmit} className={style.form} >
      <div className={`mb-1 ${style.formInput}`} style={{marginTop:'5px'}}>
        {/* CORREO */}
        <label className={style.labelExample} htmlFor="exampleInputEmail1" style={{fontSize:'15px'}}>&nbsp; Correo</label>
        <input  onFocus={(e) => handleChange(e.target.name , true)}
        
         type="email" className={` ${style.input}`}
          name='email' value={form.email} onChange={(e) => handleChange(e.target.name, e.target.value)} 
          id="exampleInputEmail1" aria-describedby="emailHelp"
         placeholder="Ingresa tu correo" />
        {focus.email && error.email && <span className={`text-danger ${style.span}`}>{error.email}</span> }
      </div>
      {/* Nombre */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Nombre</label>
        <input type="text" className={` ${style.input}`} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)} 
          value={form.nombre} name='nombre' placeholder="Nombre" 
          onFocus={(e) => handleChange(e.target.name , true)}
        
         />
          {focus.nombre && error.nombre && <span className={`text-danger ${style.span}`}>{error.nombre}</span> }
      </div>
      {/* USUARIO */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Nombre de usuario</label>
        <input type="text"  className={ style.input} id="exampleInputPassword1" 
        placeholder="Nombre de usuario" name='usuario' 
        value={form.usuario} 
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onFocus={(e) => handleChange(e.target.name , true)}
       
        />
        {focus.usuario && error.usuario && <span className={`text-danger ${style.span}`}>{error.usuario}</span> }
      </div>
      {/* Contraseña  */}
      <div className={`mb-1 ${style.formInput} ${style.divPasswordR}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Contraseña</label>
       {/* <div className={style.containerInputContrasena}> */}
         {/* <div> */}
             <input type={visible}  style={{marginBottom: '1rem'}}  className={` ${style.input}`} id="exampleInputPassword1"
         name='contrasena' placeholder="Password" value={form.contrasena}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          onFocus={(e) => handleChange(e.target.name , true)}
          />
        <button className={` ${style.contrasena}`}  type='button' >
        {visible === 'text' && <IoEyeOff  type="button" onClick={mostrarPassword} /> }
        {visible === 'password' && <IoEye   type="button" onClick={mostrarPassword} /> }
        </button>
      
         {/* </div> */}
      
       {/*  <div  style={{marginTop:'-65px'}} > */}
        {focus.contrasena && error.contrasena && <span className={`text-danger ${style.span}`} /* style={{marginTop:'2rem'}} */>{error.contrasena}</span> }
        {/* </div> */}
       {/*  </div> */}
      </div>


      {/* CONFIRMAR CONTRASEÑA */}
           <div className={`mb-1 ${style.formInput} ${style.divPasswordR}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Confirmar contraseña</label>
        <input type={visible}  className={ style.input} id="exampleInputPassword1" 
        placeholder="Confirmar contraseña" name='contrasenaConfirm' 
        value={form.contrasenaConfirm} 
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onFocus={(e) => handleChange(e.target.name , true)}
       
        />
        <button class={` ${style.contrasena}`}  type='button' >
        { visible === 'text' && <IoEyeOff className={style.inputContrasena}  type="button" onClick={mostrarPassword} /> }
        { visible === 'password' && <IoEye  className={style.inputContrasena} type="button" onClick={mostrarPassword} /> }
        </button>
        {focus.contrasenaConfirm && error.contrasenaConfirm && <span className={`text-danger ${style.span}`} style={{marginLeft: '1rem'}}>{error.contrasenaConfirm}</span> }
      </div>
     

      {/* PAIS */}
      <div className={`mb-1 ${style.formInput}`} /* style={{marginTop:'-95px'}} */>
        <label className={style.labelExample} htmlFor="exampleInputPassword1" /* style={{marginTop:'6rem'}} */>&nbsp;  País</label>
        <input type="text"  className={` ${style.input}`} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)} 
          value={form.pais} placeholder="Pais" name='pais'
          onFocus={(e) => handleChange(e.target.name , true)}
           />
          {focus.pais && error.pais && <span className={`text-danger ${style.span}`}>{error.pais}</span> }
      </div>

      {/* Provincia */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Provincia</label>
        <input type="text"  className={` ${style.input}`} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)} 
          value={form.provincia}
           placeholder="Provincia" name='provincia' 
           onFocus={(e) => handleChange(e.target.name , true)}
         />
          {focus.provincia && error.provincia && <span className={`text-danger ${style.span}`}>{error.provincia}</span> }
      </div>
      {/* Ciudad */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Ciudad</label>
        <input type="text"  className={` ${style.input}`} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)} 
          value={form.ciudad} placeholder="Ciudad" name='ciudad'
          onFocus={(e) => handleChange(e.target.name , true)}
          />
          {focus.localidad && error.localidad && <span className={`text-danger ${style.span}`}  /* style={{marginLeft:'100px'}} */>{error.localidad}</span> }
      </div>
      {/* DIRECCIONS */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Dirección</label>
        <input type="text"  className={` ${style.input}`} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
           value={form.direccion} 
           placeholder="Direccion" 
           name='direccion' 
           onFocus={(e) => handleChange(e.target.name , true)}
          />
          {focus.direccion && error.direccion && <span className={`text-danger ${style.span}`}>{error.direccion}</span> }
      </div>
      {/* Telefono */}
      <div className={`mb-1 ${style.formInput}`}>
        <label className={style.labelExample} htmlFor="exampleInputPassword1">&nbsp; Teléfono</label>
        <input type="text"  className={ style.input} id="exampleInputPassword1"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
           value={form.telefono} 
           placeholder="Telefono"
            name='telefono' 
            onFocus={(e) => handleChange(e.target.name , true)}
           />
          {focus.telefono && error.telefono && <span className={`text-danger ${style.span}`} /* style={{marginLeft:'110px'}} */>{error.telefono}</span> }
      </div>

      <div className="form-group form-check" /* style={{marginTop:'-25px'}} */>
      </div>
      <button type="submit" class="btn btn-outline-dark w-100" >Registrarse</button>
      <div div className="form-group form-check p-2 text-center" >
        <small className={style.aviso} >
          El equipo de 
          <large className={style.aviso2}> 
          <span className={letterClass}> M</span>
          <span className={letterClass}> O</span>
          <span className={letterClass}> B</span>
          <span className={letterClass}> I</span>
          </large>
         nunca te pedirá tu correo o contraseña. </small>
      </div>

    </form>

  </div>
 </div>
  </div>
</div>

)
}
