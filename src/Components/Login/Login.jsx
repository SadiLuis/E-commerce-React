import React, { useEffect, useState } from "react";
import { login, register } from "../../Actions/Auth";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { validateEmail } from "../../Helpers/ValidateForm";
import { Col, Form, Row, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { auth, provider } from "../../Helpers/Firebase";
import { signInWithPopup } from "firebase/auth";
import styles from "./Login.module.css";
//import {postCart} from '../../actions/cart'
import uno from "../../Assets/1.jpg";
import dos from "../../Assets/2.jpg";
import tres from "../../Assets/3.jpg";


const initialForm = {
  contrasena: "",
  email: "",
};

const validateForm = (form) => {
  const { email, contrasena } = form;
  const errors = {};

  if (!email.trim()) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(email)) {
    errors.email = "Email no válido";
  }

  if (!contrasena.trim()) {
    errors.contrasena = "La contraseña es requerida";
  }

  return errors;
};

const Login = ({ login, isAuth, user, register }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
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
      return window.alert("El formulario contiene errrores");
    }
    login(form);
  };

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user) {
      const { rol } = user;
      setForm(initialForm);
      async function db() {
       // await postCart();
      }
      isAuth && db();
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home");
    }
  }, [isAuth, navigate, user]);

  const handleSesionGoogle = async (e) => {
    e.preventDefault();
    const userG = await signInWithPopup(auth, provider);
    try {
      const userGoogle = {
        contrasena: userG._tokenResponse.localId,
        email: userG._tokenResponse.email,
      };
      console.log(userGoogle);
      login(userGoogle);
    } catch (e) {
      if (
        e.message.split("/")[1] === "account-exists-with-different-credential)."
      ) {
        Swal.fire({
          title: "Ya tiene una cuenta con el mismo email",
          text: "No puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado",
          icon: "error",
        });
      }
    }
  };

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
        <h1 class="display-4">Bienvenido a <span class="text-primary">Furnishing-Store</span></h1>
        </div>
        <div class='inputs px-lg-5r py-lg-4 p-4'>
          <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
          <label htmlFor="exampleInputEmail1" >Email</label>
            <input
              className="form-control"
              type="email"
              onChange={handleChange}
              name="email"
              value={form.email}
            />
            {error.email && (
              <span >{error.email}</span>
            )}
          </div>
          <div className="form-group">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              type="password"
              onChange={handleChange}
              name="contrasena"
              value={form.contrasena}
            />
            {error.contrasena && (
              <span >{error.contrasena}</span>
            )}
          </div>
          <input type="submit" value="Ingresar"  />
          <Button variant="primary" onClick={handleSesionGoogle}>
            iniciar sesión con Google
          </Button>
          <h4>Aún no te has registrado? </h4>
          <Link to="/register" >
            Registrarse
          </Link>
          <Link to="/login/recoverpassword">¿Olvidaste la contraseña?</Link>
        </form>
      </div>
      </div>
    </div>
      
    
  );
};

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