import React, { useState, useEffect } from 'react'
import { recoveryPassword } from '../../Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'



export default function ResPassword() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: 'example@gmail.com',
    })
    let expRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let Result = expRegular.test(state.email)

    const recupContr = useSelector(state => state.loginReducer.recoveryPass)

    const handleChange = (e) => {
      e.preventDefault()
      setState({
        email: e.target.value
      })
      console.log('email', Result)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if(state.email === '' || state.email === 'example@gmail.com'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes ingresar un email valido',
          setTime : 5000
        })
      }
      dispatch(recoveryPassword(state))
    }

    useEffect(() => {
      if(recupContr){
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado un correo electronico',
          text: 'Revisa tu bandeja de entrada',
          setTime : 5000
        })
      }
    }, [recupContr, state.email])
    


  return (
    <div>
       <div className='text-center' >
            <form onSubmit={handleSubmit} >

              <label  >Ingresa tu correo</label>
              <input  type='text' onChange={handleChange} icon={'f'}/>
              {/* <p >Introduce un correo valido</p> */}
              
              <input  type='submit' className='btn btn-outline-dark'  value='Recuperar'/>

            </form>
           </div>          
    </div>
  )
}
