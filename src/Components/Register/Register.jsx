import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, updateUser } from '../../Actions/Auth'
import { bindActionCreators } from "redux";
import { validateEmail , validateTlf } from '../../Helpers/ValidateForm'
import Swal from "sweetalert2";
import uno from '../../Assets/1.jpg'
import dos from '../../Assets/2.jpg'
import tres from '../../Assets/3.jpg'
import './Registro.module.css'
import { connect } from 'react-redux';

const initialForm = {
    nombre: '',
    usuario: '',
    contrasena: '',
    confirm_contrasena: '',
    email: '',
    pais: '',
    provincia: '',
    direccion: '',
    telefono: '',
    fotoPerfil: ''
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
  } else if (form.contrasena.length < 10) {
    errors.contrasena = "Mínimo 10 caracteres";
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

  if (form.confirm_contrasena !== form.contrasena) {
    errors.confirm_contrasena = "Las contraseñas no coinciden";
  }

  return errors;
};


function Register({ updateuser, register, isAuth, user, edit = false }) {

  const navigate = useNavigate();
  const [form, setForm] = useState(
    edit ? { ...user, confirm_contrasena: "", contrasena: "" } : initialForm
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newform = { ...form, [name]: value };
    setForm(newform);
    const errors = validateform(newform, edit);
    setErrors(errors);
    return newform;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateform(form);

    const userForm = { ...form };
    delete userForm.confirm_contrasena;

    edit ? updateUser(userForm) : register(userForm);

  };

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user && !edit) {
      setForm(initialForm);
      const { nombre, rol } = user;
      Swal.fire({
        text: `Bienvenidx ${nombre}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      async function db() {
       // await postCart();
      }
      isAuth && db();
      if (rol === "1") return navigate("/dashboard/user");
      if (rol === "2") return navigate("/dashboard/admin");
    }
  }, [isAuth, navigate, user, edit]);


  return (
    <div className="row g-0 pt-3">
      <div class="col-lg-1"></div>
      <div class="col-lg-5">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img class="tamaño" src={uno} alt="First slide" />
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
        <div class="title px-lg-5 pt-lg-4 pb-2 p-4">
          <h1> Gracias por visitarnos! </h1>
        </div>
        <br />
        {/* <div class='px-lg-5r py-lg-4 p-4'></div> */}
        <h2>Registro</h2>
        <form  onSubmit={handleSubmit}>
     <div >

      <div >
      <label>Nombre</label>

      <div >
      <input  type="text" name="nombre" value={form.nombre} onChange={handleChange}/>
                {errors.nombre && <span >{errors.nombre}</span>}
      </div>

      <label>Usuario</label>
      <div>
      <input  type="text" name="usuario" value={form.usuario} onChange={handleChange}/>
                {errors.usuario && <span >{errors.usuario}</span>}
      </div>


      <label>Contraseña</label>
      <div >
        <input  type="password" name="contrasena" value={form.contrasena} onChange={handleChange}/>
                {errors.contrasena && <span >{errors.contrasena}</span>}
      </div>


      <label>Confirmar contraseña</label>
      <div  >
        <input  type="password" name="confirm_contrasena" value={form.confirm_contrasena} onChange={handleChange}/>
        {errors.confirm_contrasena && <span >{errors.confirm_contrasena}</span>}
      </div>

      <label>Email</label>
      <div  >
        <input  type="email" name="email" value={form.email} onChange={handleChange}/>
        {errors.email && <span >{errors.email}</span>}
      </div>

      </div>
      <div>

      <label>País</label>
      <div >
        <input  type="text" name="pais" value={form.pais} onChange={handleChange}/>
        {errors.pais && <span >{errors.pais}</span>}
      </div>

      <label>Provincia</label>
      <div >
        <input type="text" name="provincia" value={form.provincia} onChange={handleChange}/>
        {errors.provincia && <span >{errors.provincia}</span>}
      </div>

      <label>Dirección</label>
      <div >
        <input  type="text" name="direccion" value={form.direccion} onChange={handleChange}/>
        {errors.direccion && <span >{errors.direccion}</span>}
      </div>

      <label>Telefono</label>
      <div >
        <input  type="text" name="telefono" value={form.telefono} onChange={handleChange}/>
        {errors.telefono && <span >{errors.telefono}</span>}
      </div>

      </div>
     </div>

     <div >
         <div>

           <div>

            <input type='checkbox' required/>
            <label>Acepto terminos y condiciones</label>
         </div>
      <input
              type="submit"
              value={edit ? "Guardar cambios" : "Registrarse"}
              
            />
           </div>
        <span />
           <div>
           <div>
            {/* <Button className={style.btn_google} onClick={handleSesionGoogle}>iniciar sesión con Google</Button> */}

           </div>


           <div>
            {!edit && (
              <div >
                <h5 > Ya tienes cuenta?</h5>
                <Link to="/login">
                 <button >Ingresar</button> 
                </Link>
              </div>
            )}
           </div>
           </div>

     </div>

     </form>

      </div>


    </div>

  )
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ register, updateUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);