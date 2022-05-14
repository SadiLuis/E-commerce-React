import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import addAdmin from '../../Actions/admin';
import { validateEmail } from '../../Helpers/ValidateForm';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'

const AddAdmin = () => {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    const [button, setButton] = useState(true);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    useEffect(() => {
        form.email 
        && form.password
        && form.repeatPassword
        && Object.keys(errors.email).length===0
        && Object.keys(errors.password).length===0
        && Object.keys(errors.repeatPassword).length===0
            ? setButton(false)
            : setButton(true)
    }, [form, errors])
    
    
    const validateEmailForm = (val) => {
        let errors = {}

        if(val.length===0){
            errors = 'La contraseña es requerida'
        }else{
            if(!validateEmail(val)){
                errors = 'Escriba un email valido'
            }
        }

        return errors
    }

    const validatePassword = (val) => {
        let errors = {}

        if(val.length===0){
            errors = 'La contraseña es requerida'
        }else{
            if(val.length<6){
                errors = 'Escriba una contraseña de al menos 6 caracteres'
            }
        }

        return errors
    }

    const validateRepeatPassword = (pass, val) => {
        let errors = {}
        if(pass!==val){
            errors = "Las contraseñas deben coincidir"
        }

        return errors;
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })

        if(e.target.name==='email'){
            setErrors({
                ...errors,
                [e.target.name] : validateEmailForm(e.target.value)
            })
        }

        if(e.target.name==='password'){
            setErrors({
                ...errors,
                [e.target.name] : validatePassword(e.target.value)
            })
        }

        if(e.target.name==='repeatPassword'){
            //console.log(errors)
            setErrors({
                ...errors,
                [e.target.name] : validateRepeatPassword(form.password,e.target.value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Estas seguro',
            text: `Estas por habilitar el email ${form.email} como administrador`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, habilitar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(addAdmin(form))
                Swal.fire(
                    'Habilitado',
                    'Email habilitado',
                    'success'
                )
               //navigate('/dashboard/admin/customers')
            }
        })
        setForm({
            email: '',
            password: '',
            repeatPassword: '',
        })
    }

    return (
        <div className="container-fluid">
            <div className='row min-vh-100'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                aria-describedby="emailHelp"
                                onChange={handleChange}
                                value={form.email}
                            />
                            <div id="emailHelp" className="form-text">Introduzca un email para otorgar acceso a ser admin</div>
                            {errors.email.length>0 && (<span className='text-danger'>{errors.email}</span>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                id="password" 
                                onChange={handleChange}
                                value={form.password}
                            />
                            {errors.password.length>0 && (<span className='text-danger'>{errors.password}</span>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repeatPassword" className="form-label">Repetir password</label>
                            <input type="password" 
                                className="form-control" 
                                name="repeatPassword"
                                id="repeatPassword" 
                                onChange={handleChange}
                                value={form.repeatPassword}
                            />
                            {errors.repeatPassword.length>0 && (<span className='text-danger'>{errors.repeatPassword}</span>)}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={button}>Agregar</button>
                    </form>




                </div>
            </div>
        </div>
    )
}

export default AddAdmin