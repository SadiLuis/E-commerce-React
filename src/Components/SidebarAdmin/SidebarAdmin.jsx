import { Link } from 'react-router-dom'
import styles from './SidebarAdmin.module.css'

const SidebarAdmin = () => {


    return (
        
        
            <div className="bg-dark">
                    <div className="d-flex flex-column align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="#" className="nav-link text-white align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline ">Orders</span></a>
                            </li>
                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pencil"></i> <span className="ms-1 d-none d-sm-inline">Editar Ctegorias</span></a>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline ">Item</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline">Item</span> 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-plus-circle"></i> <span className="ms-1 d-none d-sm-inline">Agregar Producto</span> </a>
                                
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-people "></i> <span className="ms-1 d-none d-sm-inline">Clientes</span> </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
                
      
    )
}
export default SidebarAdmin