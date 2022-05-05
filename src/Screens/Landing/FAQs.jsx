import React from 'react'
import logo from '../../Assets/default.png'
import '../Landing/Landing.css'
import { useNavigate } from 'react-router-dom';

const FAQs = () => {

    const navigate = useNavigate()

    return (
        <div>
            <div class="col1 col py-6 ">

                <hr class="border-dark border" />

            </div>
            <div class="about">
                <div class="py-5">
                    <div class="py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="text-justify">
                                        <p ><strong class='tituloFaqs'>FAQs</strong></p>
                                        <p class='textoFaqs'>
                                            1. ¿Cuáles son las formas de pago?
                                            R=Puede pagar sus productos a través Mercado pago
                                        </p><p class='textoFaqs'>
                                            2. ¿En las compras en línea ¿puedo hacer un apartado?
                                            R= Lamentablemente no contamos con sistema de apartado en compras por línea
                                        </p><p class='textoFaqs'>
                                            3. ¿Cuánto tiempo tardan en entregar mi compra?
                                            R= La entrega se realiza de 4 a 15 días hábiles dependiendo de la saturación propia del negocio, esto una vez que confirma su compra con los  formatos que le enviamos por correo.
                                        </p><p class='textoFaqs'>
                                            4. ¿Cuáles son los días de entrega?
                                            R = De lunes a sábado en horario abierto de 10 a.m. a 10 p.m.
                                            En caso de ser temporada alta se consideran las entregas los domingos, esto con previa consulta a nuestros clientes.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <div>
                                            <div class="embed-responsive embed-responsive-3by2">
                                                <img class='logoAbout' src={logo} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col1 col pb-5">

                    <hr class="border-dark border" />

                    <button type="button" class="btn btn-secondary" onClick={() => navigate('/')}> Atras </button>
                </div>
            </div>
        </div >
    )
}

export default FAQs