import React from 'react'
import logo from '../../Assets/default.png'
import '../Landing/Landing.css'
import { useNavigate } from 'react-router-dom';

const About = () => {

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
                                        <p ><strong class='tituloAbout'>Mobi ATR</strong></p>
                                        <p class='textoAbout'>
                                            Somos la propuesta más completa de muebles y accesorios del mercado, con productos diseñados y elaborados especialmente para nuestros clientes. Nuestra excelencia innata se refleja con la calidad de materiales del más alto nivel, al igual que en nuestra confiabilidad y solidez. Esto nos permite proporcionar funcionalidad, comodidad y vanguardia.
                                            Nuestra ética empresarial y el genuino interés en la satisfacción de las necesidades de nuestros clientes, profesándoles un trato cálido, amable y respetuoso han sido los pilares para consolidar el prestigio que nos distingue en el mercado.</p>
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
                <div class="col1 col">

                    <hr class="border-dark border" />

                    <button type="button" class="btn btn-secondary" onClick={() => navigate('/')}> Atras </button>
                </div>
            </div>
        </div >
    )
}

export default About