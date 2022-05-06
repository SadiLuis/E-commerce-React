import React, { Fragment } from 'react';
import './Pushbar.css';


const PushBar = ({ show, handleClose }) => {

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
                        <input className="inputPushbar" type="text" placeholder="Nombre" />
                        <input className="inputPushbar" type="email" placeholder="Correo" />
                    </form>
                </div>
                <button className="sumbitN btn btn-outline-secondary" >Submit</button>
                <button className="closeN btn btn-outline-secondary" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default PushBar