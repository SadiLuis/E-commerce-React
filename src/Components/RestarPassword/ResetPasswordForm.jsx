import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams ,useSearchParams  } from "react-router-dom";
import { BASEURL } from "../../Assets/URLS";
import Swal from "sweetalert2";
import  style from "./ResetPasswordForm.module.css";
import {IoEyeOff ,IoEye} from "react-icons/io5"
import { Loader } from '../../Components/Loader/Loader'

const ResetPasswordForm = (props) => {
  const history = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth')
  const [open , setOpen] = useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isError.length){
      return  Swal.fire({
        icon: 'error',
        title: 'No se pudo cambiar la contraseña',
        text: 'Por favor revise si su nueva contraseña cumple con los requisitos establecidos',
       
      })
    }
    try{
    const response = await axios.put(
      `${BASEURL}/resetPassword/${userId}`,
      {
        contrasena: password,
      },
      {
        headers: {
           "x-auth-token": auth
        }
     }
    );

    Swal.fire({
      text: `${response.data.message}`,
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "ir a Login!.",
    }).then((result) => {
      if (result.isConfirmed) {
        history("/login");
      }
    });
    }catch(err){
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'No se pudo cambiar la contraseña',
        text: err.response.data.message,
       
      })
    }
   
  };

  const CheckValidation = (e) => {
    const confirmPass = e.target.value;
    setOpen(false)
    setConfirmPassword(confirmPass);
    if (password !== confirmPass) {
      setIsError("La contraseña no coincide");
    } else if(confirmPass.length < 6){
      setIsError("La contraseña debe tener 6 0 más caracteres")
    }else if(!confirmPass.length){
      setIsError("El campo no puede estar vacío")
    }
     else {
      setIsError("");
    }
  };

  const switchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.main_reset} onSubmit={handleSubmit}>
      <form className={`${style.mainContainer} ${style.formPass}`}>
        <h3>Nueva Contraseña</h3>
        <div className={style.divPassword}>Contraseña:</div>
        <div className={style.containerPassword}>
          <input
          className={style.inputPass}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Introduce tu Contraseña "
            requiered
          />
          <button className={style.buttonPass} onClick={switchShowPassword}>
            {" "}
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        <div>Confirmar Contraseña</div>
        <input
        className={style.inputPass}
          type="password"
          value={confirmPassword}
          onChange={(e) => CheckValidation(e)}
          name="confirmPassword"
          placeholder="confirma la Contraseña"
          required
        />
        <div className={style.confirmPassword}>{isError}</div>
        <div className={style.divButton}>
          {isLoading ? (
            <div >
              {/* <img src={loading} alt="loading" /> */}
              <Loader />
            </div>
          ) : (
            <button className={style.buttonPass} disabled={open} type="submit">Enviar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;