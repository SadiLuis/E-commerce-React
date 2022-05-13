import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cleanProductDetail, getProductById, putProductStatus } from '../../Actions/products';

const DetailProduct = ({ idProduct }) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.productsReducer.detailProduct)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductById(idProduct))
        return () => {
            cleanProductDetail()
        }
    }, [dispatch])

    const changeStatusProduct = (status,idProduct) => {
        status===true
            ?Swal.fire({
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
            :Swal.fire({
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
                    Swal.fire(
                        'Habilitado',
                        'Producto habilitado',
                        'success'
                    )
                    navigate('/dashboard/admin')
                }
            })
        
        
    }

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
                            onClick={() => changeStatusProduct(product.statusProduct,idProduct)}>
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
            <div className="row">
               <p>{product.title}</p>
               <p>{product.description}</p>
               <p>{product.price}</p>
               <p>{product.size}</p>
               <p>{product.cantidad}</p>
               <p>{product.category}</p>
            </div>
        </div>

    )
}

export default DetailProduct