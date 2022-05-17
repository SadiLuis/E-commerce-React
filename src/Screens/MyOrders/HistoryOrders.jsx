import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts,  getProductById } from '../../Actions/products'
import styles from './Orders.module.css'
import { Link } from 'react-router-dom'

export default function HistoryOrders({ fecha, productos, total, status , pedidoId }) {

    const dispatch = useDispatch()
    const product = useSelector((state) => state.productsReducer.detailProduct);
    // useEffect(() => {
    //     dispatch(getAllProductsAndDisabled())
    // }, [dispatch])
    const allProducts = useSelector(state => state.productsReducer.allProducts)
    let filteredProducts = []

    for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < allProducts.length; j++) {
            if (productos[i].producto === allProducts[j].title) {
                filteredProducts.push(allProducts[j])

            }
        }
    }



    return (
        <div style={{ textAlign: '-webkit-center' }}>
            
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className="row px-2">
                        <div className="col">
                            Fecha: {fecha.slice(0, 10)}
                        </div>
                        <div className="col">
                            {
                                status === 'ENPROCESO'
                                    ? <span>Estado: Pagado</span>
                                    : status === 'ENVIADO'
                                        ? <span>Estado: En camino</span>
                                        : status === 'ENTREGADO' && <span>Producto recibido</span>
                            }
                        </div>
                    </div>

                </div>





                {/* <div>{
                           productos && productos.map(i => <p>{i.cantidad}</p>) 
                           }
                       </div> */}

                <div className="row mh-25">
                    {
                        filteredProducts && filteredProducts.map((e, i) => (

                            <div className='col'>
                                <div className="row">
                                    <img src={e.images[0]} alt="img" style={{ width: '200px'}}  />
                                    <div className='col'>
                                        <Link to={`/detail/${e.id}`}>
                                            <p className='row fw-bold'>
                                               {e.title}
                                            </p>
                                        </Link>
                                        <p className='row fs-6'>Precio(U): {productos[i].precioUnitario}</p>
                                        <p className='row fs-6'>cantidad: {productos[i].cantidad}</p>
                                        <Link to={`/review/${e.id}`}>
                                            <button style={{ font: '-webkit-small-control', marginBottom: '1rem' }} className='row btn btn-outline-dark fs-6' >
                                                review
                                            </button >
                                        </Link>
                                        
                                    </div>


                                   
                                </div>
                                {!productos[i].status 
                                    && (
                                        <span className='text-danger px-2'>Producto no disponible</span>
                                    )
                                    }
                                    
                                
                            </div>

                        ))
                    }
                    <Link to={`/buyDetail/${pedidoId}`}>
                    <button style={{ font: '-webkit-small-control', marginBottom: '1rem' }} className='row btn btn-outline-dark fs-6'>Detalle de la compra</button>
                     </Link>
                </div>

                <div className="row">
                    <div className="col text-end">
                    <div className={styles.total}>
                        <p className='fs-4 px-2'>Total: <b>${total}</b></p>
                    </div>
                    </div>
                    
                </div>












            </div>
        </div>
    )
}