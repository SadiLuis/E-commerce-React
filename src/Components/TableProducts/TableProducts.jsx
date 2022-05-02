import React, { useEffect, useState, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, orderAlfabeticamente, orderByPrice } from '../../Actions/products';
import Paging from '../Paging/Paging';
import { Link } from 'react-router-dom';
import InputAutoComplete from '../InputAutoComplete/InputAutoComplete';
import SearchBar from '../SearchBar/SearchBar';


const TableProducts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    const allProducts = useSelector((state) => state.productsReducer.products)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState(10)
    const indexLastProduct = currentPage * productsOnPage
    const indexFirstProduct = indexLastProduct - productsOnPage
    const currentProducts = allProducts.slice(indexFirstProduct, indexLastProduct)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const id = useId();

    function handleOrderByPrice(e) {
        e.preventDefault();
        dispatch(orderByPrice(e.target.value));
    }
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderAlfabeticamente(e.target.value));
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <p className="h4 col">Productos</p>
                </div>
                <div className='row mb-1 ms-1'>
                    {/* <InputAutoComplete
                        className={`form-control col`}
                        placeholder={'Buscar Producto'}
                        fieldSearch={'title'}
                        data={allProducts}
                    />
                    <button type="submit" class="input-group-text btn-primary col-1"><i class="bi bi-search me-2"></i></button> */}


                    <div className='col'>
                        <select className='form-select' onChange={handleOrderByPrice}>
                            <option value="cero">Ordenar por precio</option>
                            <option value="asc">Menor precio</option>
                            <option value="desc">Mayor precio</option>
                        </select>
                    </div>
                    <div className='col'>
                        <select className='form-select' onChange={handleOrderByName}>
                            <option value="cero">Ordenar por letra</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>



                    <div className='col'>
                        <SearchBar setPage={setCurrentPage} />
                    </div>

                </div>

                <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped table-bordered border-primary">
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
                                    <td className='text-center'>
                                        <Link to={`/dashboard/admin/EditProduct/${p.id}`}>
                                            <i className="fs-4 bi-pencil-fill"></i>
                                        </Link>

                                    </td>
                                    <td className='text-center'>
                                        <i className="fs-4 bi-trash3-fill"></i>
                                    </td>

                                    <td>{p.title}</td>
                                    <td>{p.price}</td>
                                    <td>{p.cantidad > 0
                                        ? <span>{p.cantidad}</span>
                                        : <span className='text-danger fw-bold'>Sin Stock disponible</span>}
                                    </td>
                                    <td>{p.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='col'>
                <Paging
                    productsOnPage={productsOnPage}
                    allProducts={allProducts.length}
                    paginado={paginado}

                />
            </div>

        </div>
    )
}

export default TableProducts