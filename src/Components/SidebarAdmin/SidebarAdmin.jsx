//import styles from './SidebarAdmin.module.css'

const SidebarAdmin = () => {
    return (
        <div class="container-fluid">
            <div class="row min-vh-100 flex-column flex-md-row">
                <aside class="col-12 col-md-3 col-xl-2 p-0 bg-dark ">
                    <nav class="navbar navbar-expand-md navbar-dark bd-dark flex-md-column flex-row align-items-center py-2 text-center sticky-top " id="sidebar">
                        <button type="button" class="navbar-toggler border-0 order-1" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse order-last" id="nav">
                            <ul class="navbar-nav flex-column w-100 justify-content-center">
                                <li class="nav-item">
                                    <a href="#" class="nav-link active"> Edit Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link"> Projects</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link"> Tasks </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link"> Users Info </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
            </div>
        </div>

    )
}
export default SidebarAdmin