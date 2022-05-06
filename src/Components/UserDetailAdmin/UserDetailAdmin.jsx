import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changeStatusUser, cleanUserDetail, cleanUserDisabled, getUserById } from '../../Actions/users';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';

const UserDetailAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userById = useSelector(state => state.userReducer.userDetail);
    const userDisabled = useSelector(state => state.userReducer.userDisabled);

    useEffect(() => {
        dispatch(getUserById(id))
        return () => {
            cleanUserDetail();
            cleanUserDisabled()
        }
    }, [dispatch])

    const changeStatus = (statusUser, id,u) => {
        
        statusUser === '3'
            ? Swal.fire({
                title: 'Estas seguro',
                text: `Estas por habilitar el usuario ${u}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, habilitar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(changeStatusUser(statusUser, id))
                    Swal.fire(
                        'Habilitado',
                        'Usuario habilitado',
                        'success'
                    )
                   navigate('/dashboard/admin/customers')
                }
            })
            :Swal.fire({
                title: 'Estas seguro',
                text:  `Estas por deshabilitar el usuario ${u}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deshabilitar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(changeStatusUser(statusUser, id))
                    userDisabled.length>0
                        ?Swal.fire(
                            'Error',
                            `${userDisabled}`,
                            'error'
                        ):(Swal.fire(
                            'Deshabilitado',
                            `Usuario deshabilitado`,
                            'success'
                        ))
                        navigate('/dashboard/admin/customers')
                }
            })
        
    }

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col mt-3'>
                    <div className="row">
                        <div className="col">
                            <div className="card mb-4 border-dark">
                                <div class="card-body text-center">
                                    <img src={userById.avatar} alt="avatar"
                                        className="rounded-circle img-fluid "
                                        width="150" />
                                    <h5 className="my-3">{userById.usuario}</h5>
                                    <div className="d-flex justify-content-center mb-2">
                                        {userById.rol === '3'
                                            ? (<button
                                                onClick={() => changeStatus(userById.rol, userById.id, userById.usuario)} type="button" class="btn btn-success">
                                                Habilitar usuario
                                            </button>)
                                            : (<button
                                                onClick={() => changeStatus(userById.rol, userById.id, userById.usuario)}
                                                type="button" className="btn btn-danger">
                                                Desabilitar usuario
                                            </button>)
                                        }
                                        <button type="button" className="btn btn-primary ms-1">Chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col mt-3">
                    <div className="card mb-4 border-dark">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">Nombre</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{`${userById.nombre}`}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">Email</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{userById.email}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">Teléfono</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{userById.telefono}</p>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">Dirección</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{`${userById.direccion}`}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">Provincia</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{`${userById.provincia}`}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-5">País</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-5">{`${userById.pais}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailAdmin