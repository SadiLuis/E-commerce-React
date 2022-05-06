import { Link } from 'react-router-dom'
import styles from './SidebarAdmin.module.css'

const SidebarAdmin = () => {


    return (


        <div className={styles.sidebar__admin}>
            <div className="bg-dark d-flex flex-column align-items-sm-start pt-2 text-white vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start ms-1" id="menu">
                    <li>
                        <Link to={`/dashboard/admin/`}>
                            <button className="nav-link px-0 align-middle text-white">
                                <i className="fs-5 bi-speedometer2"></i>
                                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                            </button>
                        </Link>

                    </li>
                    <li>
                        <Link to={`/dashboard/admin/orders`}>
                            <button className="nav-link px-0 align-middle text-white">
                                <i className="fs-5 bi-table"></i>
                                <span className="ms-1 d-none d-sm-inline ">Pedidos</span>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/admin/addCategory`}>
                        <button className="nav-link px-0 align-middle text-white">
                            <i className="fs-5 bi-pencil"></i>
                            <span className="ms-1 d-none d-sm-inline">Categorias</span>
                        </button>
                        </Link>
                        
                    </li>
                    <li>
                        <Link to={`/dashboard/admin/createProduct`}>
                        <button  className="nav-link px-0 align-start text-white">
                            <i className="fs-5 bi-plus-circle"></i>
                            <span className="ms-1 d-none d-sm-inline fs-6">Agregar producto</span>
                        </button>
                        </Link>
                        

                    </li>
                    <li>
                        <Link to={`/dashboard/admin/customers`}>
                        <button className="nav-link px-0 align-middle text-white">
                            <i className="fs-5 bi-people "></i>
                            <span className="ms-1 d-none d-sm-inline">Clientes</span>
                        </button>
                        </Link>
                        
                    </li>
                </ul>

            </div>
        </div>


    )
}
export default SidebarAdmin