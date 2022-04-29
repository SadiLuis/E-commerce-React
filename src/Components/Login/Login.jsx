import React, { useEffect, useState } from "react";
import { login, register } from "../../Actions/Auth";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateEmail } from "../../Helpers/ValidateForm";
import Swal from "sweetalert2";
import { Col, Form, Row, Button } from "react-bootstrap";
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/3.jpg'
import style from './Login.module.css'

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

function Login({ login, isAuth, user }) {
  
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
    const errors = validateForm(form);
    setError(errors);

    if (Object.keys(errors).length) {
      console.log(errors)
      return window.alert("El formulario contiene errrores");
    }
    Swal.fire({
      title: 'Espere, validando información',    
      text: 'Este mensaje desaparecerá en 5 segundos',
      icon: 'info',      
      timer: 5000,
    })
    login(form);
  };

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user) {
      const { rol } = user;
      setForm(initialLogin);
      async function db() {
        //await postCart();
      }
      isAuth && db();
      rol === "2" ? navigate("/dashboard/admin") : navigate("/");
    }
  }, [isAuth, navigate, user]);

  return (
    <div class="row g-0 pt-3">
      <div class="col-lg-1"></div>
      <div class="col-lg-5">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={uno} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img src={dos} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img  src={tres} alt="Third slide" />
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

      <div class="col-lg-5">
      <div class="title px-lg-5 pt-lg-4 pb-lg-3 p-4">
          <h1> MOBI</h1>
      </div>
      <div class='inputs px-lg-5r py-lg-4 p-4'>
      <div className='conteiner-login'>
      <h2>Login</h2>
        <form onSubmit={handleSubmit} >
          <div class='mb-3'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input type="email" className="form-control" placeholder="Ingresa tu correo" name='email'
            value={form.email } onChange={handleChange}  />
            
           { error && error.email && (
              <span >{error.email}</span>
              )}
            
            
            
            <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input type="password" className="form-control" placeholder="Ingresa tu contraseña" name='contrasena' value={form.contrasena} onChange={handleChange} />
                
               { error && error.password && (
                  <span >{error.contrasena}</span>
                )}
               
            </div>
                <button type="submit" class="btn btn-primary"  disabled={!form.email || !form.contrasena} >Submit</button>
          </div>
          <br/>

          <div className='text-center'>
            <span className="">¿No tienes cuenta?</span>
            <Link to='/register'>Registrate</Link> 
            
          </div>

        </form>
        
       </div>
      </div>

      </div>

    </div>   

  )      
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login, register }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
