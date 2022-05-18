import React, { useEffect, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cleanProductDetail, getAllProducts, getProductById, putProductStatus } from '../../Actions/products';
import { Loader } from '../Loader/Loader';

const DetailProduct = ({ idProduct }) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.productsReducer.detailProduct)
    const navigate = useNavigate();
    const idImg = useId();

    useEffect(() => {
        dispatch(getProductById(idProduct))
        return () => {
            cleanProductDetail()
        }
    }, [dispatch])

    const changeStatusProduct = (status, idProduct) => {
        status === true
            ? Swal.fire({
                title: 'Estas seguro',
                text: `Estas por deshabilitar el producto`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deshabilitar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(putProductStatus(idProduct))
                    Swal.fire(
                        'Deshabilitado',
                        'Producto deshabilitado',
                        'success'
                    )
                    navigate('/dashboard/admin')
                }
            })
            : Swal.fire({
                title: 'Estas seguro',
                text: `Estas por habilitar el producto`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, habilitar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(putProductStatus(idProduct))
                    dispatch(getAllProducts())
                    Swal.fire(
                        'Habilitado',
                        'Producto habilitado',
                        'success'
                    )
                    navigate('/dashboard/admin')
                }
            })


    }
    if (!product) {
        <Loader />
    } else {
        return (
            <div className="row">
                <div className='row'>
                    <div className='col'>
                        <Link to={`/dashboard/admin/EditProduct/${idProduct}`}>
                            <button type="button"
                                className="btn btn-outline-primary">
                                Editar Producto
                            </button>
                        </Link>
                    </div>
                    <div className="col">
                        {product?.statusProduct
                            ? <button type="button"
                                className="btn btn-outline-danger"
                                onClick={() => changeStatusProduct(product.statusProduct, idProduct)}>
                                Deshabilitar Producto
                            </button>
                            : <button type="button"
                                className="btn btn-outline-success"
                                onClick={() => changeStatusProduct(product.statusProduct, idProduct)}>
                                Habilitar Producto
                            </button>
                        }

                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <div className="row">
                            <div className="col-2">
                            {product.images?.map((i,idImg) =>
                            <div className="row">
                                 <img src={i} alt='Product' className='img-thumbnail' key={`img-${idImg}`}/>
                            </div>
                           
                        )}
                            </div>
                            <div className="col-10">
                            <img src={product.images[0]} alt='Product' className='img-thumbnail' key={`img-${idImg}`}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Nombre: '}
                                </span>
                                {product.title}
                            </p>
                        </div>
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Descripcion: '}
                                </span>
                                {product.description}
                            </p>

                        </div>
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Precio: '}
                                </span>
                                {product.price}
                            </p>
                        </div>
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Dimensiones: '}
                                </span>
                                {product.size}
                            </p>
                        </div>
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Stock: '}
                                </span>
                                {product.cantidad}
                            </p>
                        </div>
                        <div className="row">
                            <p className='fs-5'>
                                <span className='fw-bold'>
                                    {'Categoria: '}
                                </span>
                                {product.category}
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        )
    }

}

export default DetailProduct