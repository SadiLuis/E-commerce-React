import React, { useState, useEffect } from 'react'
import uno from '../../Assets/uno.JPG'
import dos from '../../Assets/dos.JPG'
import tres from '../../Assets/tres.JPG';
import '../Landing/Landing.css'
import { useNavigate } from 'react-router-dom';
import PushBar from '../Landing/PushBar.jsx'
import { updateCart } from '../../Actions/cart';
import { useDispatch } from 'react-redux';



const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [stateNewsletter, setStateNewsletter] = useState({
    nombre: '',
    email: ''
  })

  useEffect(() => {
    setTimeout(() => {
      setShowNewsletter(true)
    }, 15000)
  }, [])

  function handleClose() {
    setShowNewsletter(false)
    setStateNewsletter({ nombre: '', email: '' })
  }

  React.useEffect(() => {
    dispatch(updateCart())

  }, [dispatch])
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={uno} className="d-block mx-auto w-75" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src={dos} className="d-block mx-auto w-75" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src={tres} className="d-block mx-auto w-75" alt="Third slide" />
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

      <div className="col1 col">


        <hr className="border-dark border" />

      </div>

      <div className="m-0 p-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="pb-5">
                <div className="image">
                  <div className="pb-3 mb-3">

                    <span className="bg-light d-block" >

                      <div className="embed-responsive embed-responsive-3by2">
                        <div className="embed-responsive-item">
                          <img className="imgLand w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/UMAGE_packshot_5102_5501-1_AConversationPiece_blackoak_petrolblue_highres_1_1_640x@2x.progressive.jpg?v=1638884064" alt="Conversation Piece Lounge Chair" onClick={() => navigate('/detail/6')} />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div className="titleInfo">
                  <h3 className="mb-3 ">

                    <span onClick={() => navigate('/detail/6')}>
                      Conversation Piece Lounge Chair
                    </span>

                  </h3>

                </div>
                <p className=" info mb-3">

                  Inspirado en la tradición escandinava de las formas de los muebles que fluyen libremente, el sillón de Anders Klem se define por sus curvas. La pieza de conversación es una silla de aspecto muy orgánico, dice el diseñador. Está llena de detalles interesantes, como la forma en que la pata trasera se convierte en una horquilla que mantiene unidos el respaldo y el asiento. La comodidad también es clave, con la posibilidad de cambiar de posición al sentarse sin dejar de tener un apoyo adecuado para la espalda. Con su carcasa de roble aceitado para resaltar las vetas de la superficie, las telas de los tapizados de la silla han sido cuidadosamente seleccionadas para complementar la madera natural.

                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="pb-5">
                <div className="image">
                  <div className="pb-3 mb-3">

                    <span className="bg-light d-block" >

                      <div className="embed-responsive embed-responsive-3by2">
                        <div className="embed-responsive-item">
                          <img className="imgLand w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/BoomerangHM2SoapedOakw.LoopMarine_640x@2x.progressive.jpg?v=1626238627" alt="Boomerang Armchair HM2" onClick={() => navigate('/detail/8')} />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div className="titleInfo">
                  <h3 className="mb-3">

                    <span onClick={() => navigate('/detail/8')}>
                      Boomerang Armchair HM2
                    </span>

                  </h3>

                </div>
                <p className="info mb-3">

                  Hvidt & Mølgaard ha añadido esta versión de su sillón Boomerang, lanzado en 1956. Los renombrados diseñadores de mediados de siglo idearon una forma memorablemente aerodinámica, con una estructura de madera pulida a mano y finas patas cónicas de latón. Hay una amplia selección de tapicerías disponibles, junto con la posibilidad de elegir los acabados de roble o nogal aceitados para la estructura del sillón.

                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pb-5">
                <div className="image">
                  <div className="pb-3 mb-3">

                    <span className="bg-light d-block" >

                      <div className="embed-responsive embed-responsive-3by2">
                        <div className="embed-responsive-item">
                          <img className="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/FAD02NA_FanDiningChairNaturalOak_Main_640x@2x.progressive.jpg?v=1634723597" alt="Fan Dining Chair" onClick={() => navigate('/detail/12')} />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div className="titleInfo">
                  <h3 className="mb-3 ">

                    <span onClick={() => navigate('/detail/12')} >
                      Fan Dining Chair
                    </span>

                  </h3>

                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pb-5">
                <div className="image">
                  <div className="pb-3 mb-3">

                    <span className="bg-light d-block" >

                      <div className="embed-responsive embed-responsive-3by2">
                        <div className="embed-responsive-item">
                          <img className="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/100030_S.A.C.diningchair_1_exposed1_640x@2x.progressive.jpg?v=1625484071" alt="S.A.C. Dining Chair" onClick={() => navigate('/detail/14')} />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div className="titleInfo" onClick={() => navigate('/detail/14')}>
                  <h3 className="mb-3 ">

                    <span>
                      S.A.C. Dining Chair
                    </span>

                  </h3>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="col1 col">

        <hr className="border-dark border" />
      </div>

      <div>
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title">
                  <div className="m-0">
                    <h2 className="mb-5">

                      <span className="titleInfo">
                        Ofertas
                      </span>

                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-auto">
              </div>
            </div>
          </div>
        </div>
        <div className="ofertas">
          <div className="mb-5">
            <div className="container">
              <div className="row">

                <div className="col-6 col-sm-6">
                  <div className="producto">
                    <div className="pb5">

                      <div className="image">
                        <div className="mb-3">
                          <span className="bg-light d-block">
                            <div className="embed-responsive embed-responsive-1by1">
                              <div className="embed-responsive-item">
                                <img className="w-100 lazyloaded" alt="Rest Sofa 2" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/NewProject01_89fe0188-2c94-483e-aaea-e514d7dc575e_640x@2x.progressive.jpg?v=1624364876" />
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="titleO">
                        <div className="m-0">
                          <p className="m-0">
                            <strong onClick={() => navigate('/detail/20')}>
                              Rest Sofa 2
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div className="price">
                        <div className="pb-3 mb-4">
                          <s className="text-danger">
                            $5,249
                          </s> &nbsp;
                          <span >
                            $4,749
                          </span>

                        </div>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-6">
                  <div className="producto">
                    <div className="pb5">

                      <div className="image">
                        <div className="mb-3">
                          <span className="bg-light d-block">
                            <div className="embed-responsive embed-responsive-1by1">
                              <div className="embed-responsive-item">
                                <img className="w-100 lazyloaded" alt="Juice Rectangular Table" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/Juice_41_1_640x@2x.progressive.jpg?v=1625140351" />
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="titleO">
                        <div className="m-0">
                          <p className="m-0">
                            <strong onClick={() => navigate('/detail/31')}>
                              Juice Rectangular Table
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div className="price">
                        <div className="pb-3 mb-4">
                          <s className="text-danger">
                            $9,729
                          </s> &nbsp;
                          <span >
                            $8,491
                          </span>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div >

        </div>
      </div>


      <div className="footer py-5">

        <div className="container">
          <div className="row">
            <div className="col-6 col-lg-4">
              <div className="menu">
                <div className="m-0">
                  <div className="rule">
                    <div className="pb-3">
                      <hr className="border-dark" />
                    </div>
                  </div>
                  <div className="titleFooter">
                    <div className="mb-3">
                      <strong>
                        About
                      </strong>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div>
                        <div className="m-0" >
                          <span className="links" onClick={() => navigate('/about')}>
                            About Us
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="menu">
                <div className="m-0">
                  <div className="rule">
                    <div className="pb-3">
                      <hr className="border-dark" />
                    </div>
                  </div>
                  <div className="titleFooter">
                    <div className="mb-3">
                      <strong >
                        Contact
                      </strong>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="link">
                        <div className="m-0">
                          <span className="links" onClick={() => navigate('/contactform')}>
                            E-mail Us
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="menu">
                <div className="m-0">
                  <div className="rule">
                    <div className="pb-3">
                      <hr className="border-dark" />
                    </div>
                  </div>
                  <div className="titleFooter">
                    <div className="mb-3">
                      <strong>
                        Support
                      </strong>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="link">
                        <div className="m-0">
                          <span className="links" onClick={() => navigate('/faqs')}>
                            FAQs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PushBar
        show={showNewsletter}
        state={stateNewsletter}
        setState={setStateNewsletter}
        handleClose={handleClose} />
    </div >
  )
}


export default Landing

