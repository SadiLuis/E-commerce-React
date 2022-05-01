import React,  { useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers } from '../../Actions/users';
import { getUserDetail, logout, updateUserImg} from '../../Actions/Auth';
import { Link } from 'react-router-dom';
import './Profile.module.css'
export default function Profile() {
  
  
  const dispatch = useDispatch()
  React.useEffect(()=> {
    dispatch(getUserDetail())
  }, [])
  const [input, setInput] = useState({
    img: ""
  })
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
   const handleChange = (e) => {
     setInput({
       
       [e.target.name] : e.target.value
    })
   }
   let body = {id: myUser?.id, img: input.img}
   const handleSubmit = () => {
    dispatch(updateUserImg(body))
   }
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
          myUser && <div className='col-auto'><button className='btn btn-link' onClick={()=> dispatch(logout())}>Sign Out</button></div>
        }

        </div>

     
        
        {
         
            myUser?
              <div className='row'>
                <div className='col col-lg-6'>
                  Todavía no tienes pedidos cargados
                </div>
                <div className='col col-lg-6'>
                
                    <div className='text-center'>
                      <p className='mb-3'>{myUser.nombre}</p>
                      <p className='mb-3'>Nombre de usuario: {myUser.usuario}</p>
                       <img src={myUser.avatar} id="profile" className='rounded-circle' style={{width: "35%"}} alt="avatar" />
                       <form onSubmit={() => handleSubmit()}>
                          <input type="text" value={input.img} name= "img" onChange={(e) => handleChange(e)} />
                          <button type='submit'>enviar</button>
                       </form>
                       
                      </div>
                  
                  
                 
                  
                  <div className='rule'>
                    <div className='text-center'>
                      <hr  />
                    </div>
                  </div>
                  <div className='address'>
                    <div className=' text-center mb-5'>
                      <p>Pais: {myUser.pais}</p>
                  <p>Teléfono: {myUser.telefono}</p>
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
