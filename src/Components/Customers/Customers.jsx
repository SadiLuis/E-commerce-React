import React from 'react'
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'
import TableCustomers from '../TableCustomers/TableCustomers'

const Customers = () => {
    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <h4 className='h4'>Clientes</h4>
                    <TableCustomers/>
                </div>
            </div>
        </div>
    )
}

export default Customers