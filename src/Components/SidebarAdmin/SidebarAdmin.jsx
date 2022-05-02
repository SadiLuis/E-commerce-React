import { Link } from 'react-router-dom'
import styles from './SidebarAdmin.module.css'

const SidebarAdmin = () => {


    return (
        
        
            <div className="bg-dark">
                    <div className="d-flex flex-column align-items-sm-start pt-2 text-white vh-100">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start ms-1 mx-sm-auto" id="menu">
                            <li>
                                <a href="/dashboard/admin/" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-speedometer2"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard/admin/orders" className="nav-link px-0 align-middle text-white">
                                <i className="fs-5 bi-table"></i> 
                                <span className="ms-1 d-none d-sm-inline ">Orders</span>
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard/admin/addCategory"  className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-pencil"></i> 
                                    <span className="ms-1 d-none d-sm-inline">Categorias</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu3" className="nav-link px-0 align-start text-white">
                                    <i className="fs-5 bi-plus-circle"></i> 
                                    <span className="ms-1 d-none d-sm-inline fs-6">Agregar producto</span> 
                                </a>
                                
                            </li>
                            <li>
                                <a href="/dashboard/admin/customers" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-5 bi-people "></i> 
                                    <span className="ms-1 d-none d-sm-inline">Clientes</span> 
                                </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
                
      
    )
}
export default SidebarAdmin