import React, { useEffect, useState } from "react";
import { login, register } from "../../Actions/Auth";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateEmail } from "../../Helpers/ValidateForm";
import Swal from 'sweetalert2';
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/3.jpg'
import './Login.module.css'

const initialLogin = {
  email: '',
  password: '',
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

const Login = ({ login, isAuth, user, register }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialLogin);
  const [error, setError] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newLogin = { ...login, [name]: value }

    setForm(newLogin)
    setError(validateForm(newLogin))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm(login)
    setError(errors)

    if (Object.keys(errors).length === 0) {
      return Swal.fire({
        title: 'Espere por favor',
        text: 'Estamos validando sus datos',
        icon: 'info',
        allowOutsideClick: false
      })      
    } 
    login(login)
    
  }

  // useEffect(() => {
  //   if(isAuthenticated && user){
  //     const { rol } = user;
  //     setLogin(initialLogin)
  //     // async function DB (){
  //     //   await postCart()
  //     // }
  //     isAuthenticated()
  //     rol === '2' ? navigate('/dashboard/admin') : navigate('/home')
  //   }
  // }, [isAuthenticated, user, navigate])

  return (
    <div class="row g-0 pt-3">
      <div class="col-lg-1"></div>
      <div class="col-lg-5">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="tamaño" src={uno} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="tamaño" src={dos} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="tamaño" src={tres} alt="Third slide" />
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
          <h1> Fornitu-Ecommerce</h1>
      </div>
      <div class='inputs px-lg-5r py-lg-4 p-4'>
      <div className='conteiner-login'>
      <h2>Login</h2>
        <form onSubmit={handleSubmit} >
          <div class='mb-3'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input type="email" className="form-control" placeholder="Ingresa tu correo" name='email'
            value={login.email } onChange={handleChange}  />
            
           { error && error.email && (
              <span >{error.email}</span>
              )}
            
            
            
            <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input type="password" className="form-control" placeholder="Ingresa tu contraseña" name='password' value={login.password} onChange={handleChange} />
                
               { error && error.password && (
                  <span >{error.password}</span>
                )}
               
            </div>
                <button type="submit" class="btn btn-primary" disabled={!login.email || !login.password}  >Submit</button>
          </div>
          <br/>

          <div className='text-center'>
            <span>¿No tienes cuenta?</span>
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
