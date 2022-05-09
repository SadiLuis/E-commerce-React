import React, { useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllCategories, getCategories, postCategories } from '../../Actions/Category';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'

const AddCategory = () => {
    function validate(category) {
        let nameTest = /^[a-zA-ZA-y\s]{3,255}$/; //solo letras de 3 a 255 caracteres
        let errors = {};

        if (!category.nombre) {
            errors.nombre = "Se requiere un nombre de Categoría";
        } else if (!nameTest.test(category.nombre.trim())) {
            errors.nombre = "No se permiten números , solo letras de 3 a 80 caracteres";
        }
        return errors;
    }


    const dispatch = useDispatch();
    const history = useNavigate();

    const CategoriasAll = useSelector(
        (state) => state.categoriesReducer.categories
    );
    
    const id = useId();
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const [errors, setErrors] = useState({});
    const [category, setcategory] = useState({
        nombre: "",
    });
    //console.log(category)
    const handleChange = (e) => {
        setcategory({
            ...category,
            nombre: e.target.value,
        });
        setErrors(
            validate({
                ...category,
                nombre: e.target.value,
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category.nombre) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar los campos faltantes",
                timer: 4000,
            });
            return;
        } else {
            //console.log(activity)
            dispatch(postCategories(category));
            Swal.fire({
                icon: "success",
                title: "Categoría creada",
                text: "La categoría se ha creado correctamente",
                timer: 4000,
            });
            setcategory({
                nombre: "",
            });
            history("/dashboard/admin");
        }
    };
    return (
        <div className="container-fluid">
            <div className='row min-vh-100'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <h4 className='h4'>Agregar categoria</h4>
                    <div className='row mb-4'>
                        <div className='col-4'>
                        <select className="form-select" aria-label="">
                            <option defaultValue>Ver categorias existentes</option>
                            {CategoriasAll?.map((el,id) => (
                                <option key={`category-${id}`} value={el.nombre}>
                                    {el.nombre}
                                </option>
                            ))}
                        </select>
                        </div>
                        
                    </div>
                    
                        <div className='row'>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={category.nombre}
                                    onChange={handleChange}
                                    placeholder='Ingrese nombre de la categoria'
                                    className='col-4 mb-4'
                                />
                                {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                                <div className='col-2'>
                                    {errors.hasOwnProperty("nombre") ? (
                                        <p> Por favor complete los campos faltantes </p>
                                    ) : (
                                        <button className='btn btn-success' type="submit">
                                            Crear Categoría
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default AddCategory