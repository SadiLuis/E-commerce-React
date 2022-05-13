import React from 'react'
import { useParams } from 'react-router-dom'
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import DetailProduct from './DetailProduct';



const DetailProductScreen = () => {
    const {id} = useParams();
  return (
    <div className="container-fluid">
            <div className='row min-vh-100'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <h4 className='h4'>Detalle del producto</h4>
                    <DetailProduct idProduct={id}/>
                </div>
            </div>
        </div>
  )
}

export default DetailProductScreen