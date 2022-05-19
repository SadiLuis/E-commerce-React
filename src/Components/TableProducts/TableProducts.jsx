import React, { useEffect, useState, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getProductsByCat, getProductsByCategoryAdmin, orderAlfabeticamente, orderByPrice } from '../../Actions/products';
import Paging from '../Paging/Paging';
import { Link } from 'react-router-dom';
import InputAutoComplete from '../InputAutoComplete/InputAutoComplete';
import SearchBar from '../SearchBar/SearchBar';
import { Loader } from '../Loader/Loader';
import { getAllCategories } from '../../Actions/Category';


const TableProducts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])

    const allProducts = useSelector((state) => state.productsReducer.products)
    const categories = useSelector(state => state.categoriesReducer.categories)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState(10)
    const indexLastProduct = currentPage * productsOnPage
    const indexFirstProduct = indexLastProduct - productsOnPage
    const currentProducts = allProducts?.slice(indexFirstProduct, indexLastProduct)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const id = useId();

    function handleSelect(e) {

        e.preventDefault();
        if(e.target.value==="cero"){
            dispatch(getAllProducts())
        }else{
            if(e.target.value==="A-Z"||e.target.value==="Z-A"){
                dispatch(orderAlfabeticamente(e.target.value));
            }else{
                if (e.target.value==="asc"||e.target.value==="desc") {
                    dispatch(orderByPrice(e.target.value));
                }
            }
        }
        
    }

    const handleCategories = (e) => {
        dispatch(getProductsByCategoryAdmin(e.target.value))
    }

    // function handleOrderByPrice(e) {
    //     e.preventDefault();
    //     dispatch(orderByPrice(e.target.value));
    // }
    // function handleOrderByName(e) {
    //     e.preventDefault();
    //     dispatch(orderAlfabeticamente(e.target.value));
    // }

    if(!currentProducts) {
        return <Loader/>
    }else{

    
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
                        <select className='form-select' onChange={handleSelect}>
                            <option value="cero">Todos los productos</option>
                            <option value="asc">Menor precio</option>
                            <option value="desc">Mayor precio</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                    <div className="col">
                        <select name="" id="" className='form-select' onChange={handleCategories}>
                            <option value="All">Todas las categorias</option>
                            {categories?.map((c,i)=>(
                                <option value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <SearchBar setPage={setCurrentPage} setOrigin={"admin"}/>
                    </div>
                    

                </div>

                <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped table-bordered border-dark">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Categoria</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts?.map((p,id) => (
                                <tr key={`tr-${id}`}>
                                    <td key={`status-${id}`} className='text-center'>
                                    {p.statusProduct === true
                                        ? <i className="fs-4 bi-check-circle text-success" ></i>
                                        : <i className="fs-4 bi-x-circle text-danger"></i>
                                    }
                                    </td>

                                    <td key={`title-${id}`}>{p.title}</td>
                                    <td key={`price-${id}`}>{p.price}</td>
                                    <td key={`quantity-${id}`}>{parseInt(p.cantidad) > 0
                                        ? <span>{parseInt(p.cantidad)}</span>
                                        : <span className='text-danger fw-bold'>Sin Stock disponible</span>}
                                    </td>
                                    <td key={`category-${id}`}>{p.category}</td>
                                    <td key={`delete-${id}`} className='text-start'>
                                        <Link to={`/dashboard/admin/detailproduct/${p.id}`}>
                                     
                                            Ver detalle/Deshabiltar
                                        
                                        </Link>
                                    </td>
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
}

export default TableProducts