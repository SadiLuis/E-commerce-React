import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers } from '../../Actions/users';
import { Link } from 'react-router-dom';
import './Profile.module.css'
export default function Profile() {
  
  
  const dispatch = useDispatch()
  React.useEffect(()=> {
    dispatch(getAllUsers())
  }, [])
  
  const allUsers = useSelector((state)=> state.userReducer.users)
  
  return (
    <div className='account'>
      <div className="py-5">
      <div className='container'>
    <div className='row'>
        <div className='col'>
          <button className='btn btn-link'><Link to='/'>Back to home</Link></button>
          <div className='text-left title'>
            <h1 className='py-2 mb-5' >Mi cuenta</h1>
          </div>
          
        </div>
        
        {
          allUsers.length && <div className='col-auto'><button className='btn btn-link'>Sign Out</button></div>
        }

        </div>

     
        
        {
         
            allUsers.length?
              <div className='row'>
                <div className='col col-lg-6'>
                  Todavía no tienes pedidos cargados
                </div>
                <div className='col col-lg-6'>
                
                    <div className='text-center'>
                      <p className='mb-3'>{allUsers[1].nombre}</p>
                      <p className='mb-3'>Nombre de usuario: {allUsers[1].usuario}</p>
                       <img src={allUsers[1].avatar} id="profile" className='rounded-circle' style={{width: "35%"}} alt="avatar" />
                      </div>
                  
                  
                 
                  
                  <div className='rule'>
                    <div className='text-center'>
                      <hr  />
                    </div>
                  </div>
                  <div className='address'>
                    <div className=' text-center mb-5'>
                      <p>Pais: {allUsers[1].pais}</p>
                  <p>Teléfono: {allUsers[1].telefono}</p>
                    </div>
                  
                  </div>
                
                  
                </div>
                </div>
              
              : <div className='row'>No existe el usuario</div>
              
            
          }
      </div>
      </div>
    </div>
  )
}
