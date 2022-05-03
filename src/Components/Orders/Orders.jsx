import React from 'react'
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'
import TableOrders from '../TableOrders/TableOrders'

const Orders = () => {
  return (
    <div className="container-fluid">
            <div className='row'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <h4 className='h4'>Pedidos</h4>
                    <TableOrders/>
                </div>
            </div>
        </div>
  )
}

export default Orders