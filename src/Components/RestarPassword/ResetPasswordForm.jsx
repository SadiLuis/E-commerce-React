import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `${BASEURL}/resetPassword/${userId}`,
      {
        contrasena: password,
      },
     
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

    console.log(response.data);
  };

  const CheckValidation = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    if (password !== confirmPass) {
      setIsError("La contraseña no coincide");
    } else {
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
            <button className={style.buttonPass} type="submit">Enviar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;