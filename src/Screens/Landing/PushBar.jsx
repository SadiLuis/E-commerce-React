import React, { Fragment, useState } from 'react';
import './Pushbar.css';
import axios from 'axios';


const PushBar = ({ show, handleClose, setState, state }) => {



    function onChange(event) {
        let { name: inputName, value: inputValue } = event.target
        const regexLetras = /^[a-zA-Z]+$|^$/;

        if (inputName === 'nombre') {
            if (!regexLetras.test(inputValue)) {
                event.preventDefault()
                return
            }
        }

        setState({
            ...state,
            [inputName]: inputValue
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (state.nombre.length && state.email.length) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = {
                nombre: state.nombre,
                email: state.email
            }
            axios.post('http://localhost:5000/newsletter', body, config)
            handleClose()
        }
        else alert('Favor de llenar todos los datos solicitados')
    }

    if (!show) {
        return <Fragment />
    }

    return (
        <div className="bg">
            <div className="pushWrap">
                <div className="pushbarTitle">
                    <h4>Suscribete a nuestro Newsletter</h4>
                </div>
                <div>
                    <form className="formPushbar">
                        <input className="inputPushbar" type="text" name="nombre" value={state.nombre} placeholder="Nombre" onChange={onChange} />
                        <input className="inputPushbar" type="email" name="email" value={state.email} placeholder="Correo" onChange={onChange} />
                    </form>
                </div>
                <button className="sumbitN btn btn-outline-secondary" onClick={handleSubmit}>Submit</button>
                <button className="closeN btn btn-outline-secondary" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default PushBar