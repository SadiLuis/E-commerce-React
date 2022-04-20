import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/3.jpg'
import './Login.module.css'

const initialLogin = {
  email: '',
  password: '',
}


export default function Login() {

  const [login, setLogin] = useState(initialLogin)
  const [error, setError] = useState({})

  const navigate = useNavigate()

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
        <form>
          <div class='mb-3'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input type="email" className="form-control" placeholder="Ingresa tu correo" name='email'
            value={login.email }/>
            {/* 
            error && error.email && (
                <span >{error.email}</span>
              )
             */}
            
            <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input type="password" className="form-control" placeholder="Ingresa tu contraseña" name='password' value={login.password}/>
                {/*
                error && error.password && (
                  <span >{error.password}</span>
                )
                */}
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
