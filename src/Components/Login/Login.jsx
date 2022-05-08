import React, { useEffect, useState } from "react";
import { login, register ,resetRegister  } from "../../Actions/Auth";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateEmail } from "../../Helpers/ValidateForm";
import Swal from "sweetalert2";
import { Col, Form, Row, Button, Carousel } from "react-bootstrap";
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/3.jpg'
import style from './Login.module.css'
import LoginGoogle from "./LoginGoogle";
const initialLogin = {
  email: '',
  contrasena: '',
}
//VALIDACIONES////
const validateForm = (form) => {
  const { email, contrasena } = form;
  const errors = {};

  if (!email) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(email)) {
    errors.email = "Email no válido";
  }

  if (!contrasena) {
    errors.contrasena = "La contraseña es requerida";
  }

  return errors;
};

function Login({ login, isAuth, user ,resetRegister }) {
  
  const navigate = useNavigate();
  const [form, setForm] = useState(initialLogin);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...form, [name]: value };

    setForm(newForm);
    setError(validateForm(newForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   console.log('entro' , error)
    if(Object.keys(error).length){
      console.log('entro',form)
      console.log(error)
      Swal.fire({
        text: `Datos incorrectos , por favor verifique que los datos ingresados sean correctos`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else{
      Swal.fire({
        title: 'Espere, validando información',    
        text: 'Este mensaje desaparecerá en 5 segundos',
        icon: 'info',      
        timer: 5000,
      })
      login(form);
      }
   
    
  };


  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    resetRegister()
    if (isAuth && user) {
      
      const { rol } = user;
      setForm(initialLogin);
      async function db() {
        //await postCart();
      }
      isAuth && db();
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home")
      
    }
    // //SI EL USUIARIO TIENE ROL 3 NO PUEDE ENTRAR AL LOGIN
    // if (user) {
    //   const { rol } = user;
    //   if (rol === "3") {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'No tienes permisos para entrar',
    //       setTime : 5000
    //     })
    //     navigate("/home")
    //   }
    // }
    
  }, [isAuth, navigate, user]);

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    <div class="row g-0 pt-3">
      <div class="col-lg-1"></div>
      <div class="col-lg-5">
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 h-25"
          src={uno}
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-25"
          src={dos}
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-25"
          src={tres}
          alt="Third slide"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
      </div>

      <div class="col-lg-5">
      <div class="title px-lg-5 pt-lg-4 pb-lg-3 p-4">
          <h1> MOBI</h1>
      </div>
      <div class='inputs px-lg-5r py-lg-4 p-4'>
      <div className='conteiner-login'>
      <h2 className={style.tituloLOg}>Login</h2>
        <form onSubmit={handleSubmit} >
          <div className='mb-3 text-center m-1 p-1'>
            <label htmlFor='exampleInputEmail1' className='text-center m-1' >Email</label>
            <input type="email" className="form-control" placeholder="Ingresa tu correo" name='email'
            value={form.email } onChange={handleChange}  />
            
           { error && error.email && (
              <span >{error.email}</span>
              )}
            
            
            
            <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Contraseña</label>
                <input type="password" className="form-control inputPass" placeholder="Ingresa tu contraseña" name='contrasena' value={form.contrasena} onChange={handleChange} />
                
               { error && error.password && (
                  <span >{error.contrasena}</span>
                )}
               
            </div>
                <button type="submit" className='btn btn-outline-dark mt-2 text-center' disabled={!form.email || !form.contrasena} onClick={handleSubmit} >Enviar</button>
          </div>
          <br/>

          <div className='text-center'>
            <span className={style.loginSpan}>¿No tienes cuenta?</span>
            <Link to='/register' className="btn btn-outline-dark p-0" >Registrate</Link>             
          </div>
         {/*  <div className="text-center">
            <span> ¿Olvidaste tu contraseña? </span>
              <Link to='/recupass' className="btn btn-outline-dark p-0" >Recuperar</Link>          
          </div> */}

        </form>
        
       </div>
      </div>
        <LoginGoogle /> 

      </div>

    </div>   

  )      
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login, register ,resetRegister }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
