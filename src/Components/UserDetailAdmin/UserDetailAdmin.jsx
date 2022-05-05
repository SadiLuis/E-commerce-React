import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { changeStatusUser, cleanUserDetail, getUserById } from '../../Actions/users';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';

const UserDetailAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userById = useSelector(state => state.userReducer.userDetail);

    useEffect(() => {
        dispatch(getUserById(id))
        return () => {
            cleanUserDetail()
        }
    }, [dispatch])

    const changeStatus = (statusUser, id) => {
        dispatch(changeStatusUser(statusUser, id))
        console.log('status:', statusUser, 'id:', id)
        navigate('/dashboard/admin/customers')
    }

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col mt-3'>
                    <div class="row">
                        <div class="col">
                            <div class="card mb-4">
                                <div class="card-body text-center">
                                    <img src={userById.avatar} alt="avatar"
                                        class="rounded-circle img-fluid "
                                        width="150" />
                                    <h5 class="my-3">{userById.usuario}</h5>
                                    <div class="d-flex justify-content-center mb-2">
                                        {userById.rol === '3'
                                            ? (<button
                                                onClick={() => changeStatus(userById.rol, userById.id)} type="button" class="btn btn-success">
                                                Habilitar usuario
                                            </button>)
                                            : (<button
                                                onClick={() => changeStatus(userById.rol, userById.id)}
                                                type="button" class="btn btn-danger">
                                                Desabilitar usuario
                                            </button>)
                                        }
                                        <button type="button" class="btn btn-primary ms-1">Chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col mt-3">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">Nombre</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{`${userById.nombre}`}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">Email</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{userById.email}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">Teléfono</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{userById.telefono}</p>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">Dirección</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{`${userById.direccion}`}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">Provincia</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{`${userById.provincia}`}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p class="mb-0 fs-5">País</p>
                                </div>
                                <div class="col">
                                    <p class="mb-0 fs-5">{`${userById.pais}`}</p>
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