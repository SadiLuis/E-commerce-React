import React, { useEffect, useState, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from "react-data-table-component";
import { getAllProducts } from '../../Actions/products';
import Paging from '../Paging/Paging';


const TableProducts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    const allProducts = useSelector((state) => state.productsReducer.products)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState(6)
    const indexLastProduct = currentPage * productsOnPage
    const indexFirstProduct = indexLastProduct - productsOnPage
    const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const id = useId();



    return (
        <div className='row'>
            <div className='col'>
                <p class="h4">Productos</p>
                <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped table-bordered border-success">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(p => (
                            <tr >
                                <td  className='text-center'>
                                    <i className="fs-4 bi-pencil-fill"></i>
                                </td>
                                <td  className='text-center'>
                                    <i className="fs-4 bi-trash3-fill"></i>
                                </td>

                                <td>{p.title}</td>
                                <td>{p.price}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <Paging
                productsOnPage={productsOnPage}
                allProducts={allProducts.length}
                paginado={paginado}

            />
        </div>
    )
}

export default TableProducts