import React from 'react'
import uno from '../../Assets/uno.JPG'
import dos from '../../Assets/dos.JPG'
import tres from '../../Assets/tres.JPG';
import '../Landing/Landing.css'
import { useNavigate } from 'react-router-dom';



const Landing = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div class="carousel-item active">
            <img src={uno} class="d-block mx-auto w-75" alt="First slide" />
          </div>
          <div class="carousel-item">
            <img src={dos} class="d-block mx-auto w-75" alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img src={tres} class="d-block mx-auto w-75" alt="Third slide" />
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

      <div class="col1 col">


        <hr class="border-dark border" />

      </div>

      <div class="m-0 p-3">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="pb-5">
                <div class="image">
                  <div class="pb-3 mb-3">

                    <span class="bg-light d-block" >

                      <div class="embed-responsive embed-responsive-3by2">
                        <div class="embed-responsive-item">
                          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/UMAGE_packshot_5102_5501-1_AConversationPiece_blackoak_petrolblue_highres_1_1_640x@2x.progressive.jpg?v=1638884064" alt="Conversation Piece Lounge Chair" />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div class="titleInfo">
                  <h3 class="mb-3 ">

                    <span>
                      Conversation Piece Lounge Chair
                    </span>

                  </h3>

                </div>
                <p class=" info mb-3">

                  Inspirado en la tradición escandinava de las formas de los muebles que fluyen libremente, el sillón de Anders Klem se define por sus curvas. La pieza de conversación es una silla de aspecto muy orgánico, dice el diseñador. Está llena de detalles interesantes, como la forma en que la pata trasera se convierte en una horquilla que mantiene unidos el respaldo y el asiento. La comodidad también es clave, con la posibilidad de cambiar de posición al sentarse sin dejar de tener un apoyo adecuado para la espalda. Con su carcasa de roble aceitado para resaltar las vetas de la superficie, las telas de los tapizados de la silla han sido cuidadosamente seleccionadas para complementar la madera natural.

                </p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="pb-5">
                <div class="image">
                  <div class="pb-3 mb-3">

                    <span class="bg-light d-block" >

                      <div class="embed-responsive embed-responsive-3by2">
                        <div class="embed-responsive-item">
                          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/BoomerangHM2SoapedOakw.LoopMarine_640x@2x.progressive.jpg?v=1626238627" alt="Boomerang Armchair HM2" />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div class="titleInfo">
                  <h3 class="mb-3">

                    <span>
                      Boomerang Armchair HM2
                    </span>

                  </h3>

                </div>
                <p class="info mb-3">

                  Hvidt & Mølgaard ha añadido esta versión de su sillón Boomerang, lanzado en 1956. Los renombrados diseñadores de mediados de siglo idearon una forma memorablemente aerodinámica, con una estructura de madera pulida a mano y finas patas cónicas de latón. Hay una amplia selección de tapicerías disponibles, junto con la posibilidad de elegir los acabados de roble o nogal aceitados para la estructura del sillón.

                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="pb-5">
                <div class="image">
                  <div class="pb-3 mb-3">

                    <span class="bg-light d-block" >

                      <div class="embed-responsive embed-responsive-3by2">
                        <div class="embed-responsive-item">
                          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/FAD02NA_FanDiningChairNaturalOak_Main_640x@2x.progressive.jpg?v=1634723597" alt="Fan Dining Chair" />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div class="titleInfo">
                  <h3 class="mb-3 ">

                    <span>
                      Fan Dining Chair
                    </span>

                  </h3>

                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="pb-5">
                <div class="image">
                  <div class="pb-3 mb-3">

                    <span class="bg-light d-block" >

                      <div class="embed-responsive embed-responsive-3by2">
                        <div class="embed-responsive-item">
                          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/100030_S.A.C.diningchair_1_exposed1_640x@2x.progressive.jpg?v=1625484071" alt="S.A.C. Dining Chair" />
                        </div>
                      </div>

                    </span>


                  </div>
                </div>
                <div class="titleInfo">
                  <h3 class="mb-3 ">

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


      <div class="col1 col">

        <hr class="border-dark border" />
      </div>

      <div>
        <div class="header">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="title">
                  <div class="m-0">
                    <h2 class="mb-5">

                      <span class="titleInfo">
                        Ofertas
                      </span>

                    </h2>
                  </div>
                </div>
              </div>
              <div class="col-auto">
              </div>
            </div>
          </div>
        </div>
        <div class="ofertas">
          <div class="mb-5">
            <div class="container">
              <div class="row">

                <div class="col-6 col-sm-6">
                  <div class="producto">
                    <div class="pb5">

                      <div class="image">
                        <div class="mb-3">
                          <span class="bg-light d-block">
                            <div class="embed-responsive embed-responsive-1by1">
                              <div class="embed-responsive-item">
                                <img class="w-100 lazyloaded" alt="Rest Sofa 2" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/NewProject01_89fe0188-2c94-483e-aaea-e514d7dc575e_640x@2x.progressive.jpg?v=1624364876" />
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div class="title">
                        <div class="m-0">
                          <p class="m-0">
                            <strong>
                              Rest Sofa 2
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div class="price">
                        <div class="pb-3 mb-4">
                          <s class="text-danger">
                            $4,749
                          </s>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
                <div class="col-6 col-sm-6">
                  <div class="producto">
                    <div class="pb5">

                      <div class="image">
                        <div class="mb-3">
                          <span class="bg-light d-block">
                            <div class="embed-responsive embed-responsive-1by1">
                              <div class="embed-responsive-item">
                                <img class="w-100 lazyloaded" alt="Juice Rectangular Table" src="https://cdn.shopify.com/s/files/1/0012/2005/1002/products/Juice_41_1_640x@2x.progressive.jpg?v=1625140351" />
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div class="title">
                        <div class="m-0">
                          <p class="m-0">
                            <strong>
                              Juice Rectangular Table
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div class="price">
                        <div class="pb-3 mb-4">
                          <s class="text-danger">
                            $8,491
                          </s>
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


      <div class="footer py-5">

        <div class="container">
          <div class="row">
            <div class="col-6 col-lg-4">
              <div class="menu">
                <div class="m-0">
                  <div class="rule">
                    <div class="pb-3">
                      <hr class="border-dark" />
                    </div>
                  </div>
                  <div class="titleFooter">
                    <div class="mb-3">
                      <strong>
                        About
                      </strong>
                    </div>
                  </div>
                  <div class="links">
                    <div class="mb-5">
                      <div class="link">
                        <div class="m-0">

                          <span onClick={() => navigate('/about')}>
                            About Us
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-4">
              <div class="menu">
                <div class="m-0">
                  <div class="rule">
                    <div class="pb-3">
                      <hr class="border-dark" />
                    </div>
                  </div>
                  <div class="titleFooter">
                    <div class="mb-3">
                      <strong >
                        Contact
                      </strong>
                    </div>
                  </div>
                  <div class="links">
                    <div class="mb-5">
                      <div class="link">
                        <div class="m-0">

                          <span onClick={() => navigate('/contactform')}>
                            E-mail Us
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-4">
              <div class="menu">
                <div class="m-0">
                  <div class="rule">
                    <div class="pb-3">
                      <hr class="border-dark" />
                    </div>
                  </div>
                  <div class="titleFooter">
                    <div class="mb-3">
                      <strong>
                        Support
                      </strong>
                    </div>
                  </div>
                  <div class="links">
                    <div class="mb-5">
                      <div class="link">
                        <div class="m-0">

                          <span onClick={() => navigate('/faqs')}>
                            FAQ
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
    </div >
  )
}


export default Landing

