import React from 'react';
import styles from './NavbarAdmin.module.css'

const NavbarAdmiin = () => {
    return (
        <div className='container'>
            <nav className="row  navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="col container-fluid">
                    {/* <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebar"
                        aria-controls="offcanvasExample"
                    >
                        <span className="navbar-toggler-icon" data-bs-target="#sidebar"></span>
                    </button> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a
                        className="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
                        href="#">Frontendfunn
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#topNavBar"
                        aria-controls="topNavBar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="topNavBar">
                        <form className="d-flex ms-auto my-3 my-lg-0">
                            <div class="input-group">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle ms-2"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-fill"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <ul class="row nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <div
                className={`offcanvas offcanvas-start bg-dark w-25`}
                tabIndex="-1"
                id="sidebar"
            >
                <div className="offcanvas-body p-0">
                    <nav className="navbar-dark vh-100">
                        <ul className="navbar-nav">
                            <li>
                                <div className="small fw-bold text-uppercase px-3">
                                    CORE
                                </div>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-3 active">
                                    <span class="me-2"><i className="bi bi-speedometer2"></i></span>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li className="my-4"><hr className="dropdown-divider bg-light" /></li>
                            <li>
                                <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                                    Interface
                                </div>
                            </li>
                            <li>
                                <a
                                    class="nav-link px-3 sidebar-link"
                                    data-bs-toggle="collapse"
                                    href="#layouts"
                                >
                                    <span class="me-2"><i class="bi bi-layout-split"></i></span>
                                    <span>Layouts</span>
                                    <span class="ms-auto">
                                        <span class="right-icon">
                                            <i class="bi bi-chevron-down"></i>
                                        </span>
                                    </span>
                                </a>
                                <div class="collapse" id="layouts">
                                    <ul class="navbar-nav ps-3">
                                        <li>
                                            <a href="#" class="nav-link px-3">
                                                <span class="me-2">
                                                    <i class="bi bi-speedometer2"></i>
                                                </span>
                                                <span>Dashboard</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-3">
                                    <span class="me-2"><i class="bi bi-book-fill"></i></span>
                                    <span>Pages</span>
                                </a>
                            </li>
                            <li class="my-4"><hr class="dropdown-divider bg-light" /></li>
                            <li>
                                <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                                    Addons
                                </div>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-3">
                                    <span class="me-2"><i class="bi bi-graph-up"></i></span>
                                    <span>Charts</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-3">
                                    <span class="me-2"><i class="bi bi-table"></i></span>
                                    <span>Tables</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavbarAdmiin