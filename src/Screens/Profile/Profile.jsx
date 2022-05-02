import React,  { useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers } from '../../Actions/users';
import { getUserDetail, logout, updateUserImg} from '../../Actions/Auth';
import {updateCart} from '../../Actions/cart'
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import Items from '../../Components/Cart/Items';
import styles from './Profile.module.css'



export default function Profile() {
  
  
  const dispatch = useDispatch()
  
  
  React.useEffect(()=> {
    dispatch(getUserDetail())
    dispatch(updateCart())
  }, [dispatch])


  const [input, setInput] = useState({
    img: ""
  })
  const [modalClose, setModalClose] = useState(false)
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
   const handleChange = (e) => {
     setInput({
       
       [e.target.name] : e.target.value
    })
   }
   
   let body = {id: myUser?.id, img: input.img}
   
   
   const handleSubmit = () => {
    dispatch(updateUserImg(body))
    setModalClose(false)
    setInput({img: ""})
   }

   const handleModel = () => {
    setModalClose(true)
   }
   const handleModalClose = () => {
     setModalClose(false)
   }

  
    let items = useSelector((state) => {
      let completeProducts = state.productsReducer.cart.products;
      completeProducts = completeProducts.map((e) => {
        const finded = state.productsReducer.allProducts.find(
          (el) => el.id === e.id
        );
        return finded ? { ...finded, quantity: e.quantity } : null;
      });
  
      return completeProducts;
    })
  
  items = items?.filter((e) => e);


  return (
     <div className='account'>
      <div className={styles.container}> 
      <div className='container'>

    <div className={`row `}>
        <div className={` ${styles.buttons}`}>
          <button className={`btn ${styles.btnLink}`}><Link to='/'>Back to home</Link></button>
            
       {/*  {
          myUser && <button className={` ${styles.btnLink}`} onClick={()=> dispatch(logout())}>Sign Out</button>
        } */}
          
        </div>

        </div>
            <div className={`text-left ${styles.containerTitle} `}>
            <h3 className={styles.title}>Mi cuenta</h3>
          </div>
            
     
        
        {
         
          myUser?
          <div className={`row ${styles.profileContainer}`}>

                {
                  
                  items.length?
                  
                  <div className={`${styles.cartProfile}`}>
                  {
                    
                    items.map((e) => (
                      <Items
                      key={e.id}
                      title={e.title}
                      image={e.images[0]}
                      price={e.price}
                      id={e.id}
                      stock={e.cantidad}
                      quantity={e.quantity}
                      category={e.category}
                      size={e.size}
                      />
                    ))
                  }
                  </div> :

<div className='col col-lg-6' style={{alignSelf: 'center', textAlign: 'center', marginBottom:'2rem'}}>
                  Todavía no tienes pedidos cargados
                </div>
         
        }
               
                <div className={`col col-lg-6 ${styles.profile}`}>
                
                    <div className='text-center'>

                      <div className={` text-center ${styles.profilePicDiv}`}>
                      <img src={myUser.avatar} id="profile" className={` ${styles.profileImg} `}  alt="avatar" />
                      <br/>
                      
                       <button className={`btn  btn-sm ${styles.iconCam}`} onClick={()=> handleModel()}><i className={`bi bi-camera-fill`}></i></button>
                      </div>
                       
                      <b><p className='mb-3'>{myUser.nombre}</p></b>
                      <p className='mb-3'>Nombre de usuario: <b>{myUser.usuario}</b></p>
                      <p className='mb-3'> email: <b>{myUser.email} </b></p>

                       
                      </div>
                  
                  
                 
                  
                  <div className='rule'>
                    <div className='text-center'>
                      <hr  />
                    </div>
                  </div>
                  <div className='address'>
                    <div className=' text-center mb-5'>
                      <p  className={styles.profileP}>Pais: {myUser.pais}</p>
                  <p className={styles.profileP}>Teléfono: {myUser.telefono}</p>
                    </div>
                    
                      
                  </div>
                  <div className='cartProducts' style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h4 className={styles.titleCart}>Productos en carrito: </h4>
                  </div>
                   
        
                  
                </div>  
               {modalClose === true && <Modal>
                <button onClick={() => handleModalClose()} className={` ${styles.modalClose}`}>Cerrar</button>
                  <form onSubmit={() => handleSubmit()}>
                    <input type="text" placeholder='.jpg, .jpeg, .svg, ...' value={input.img} name= "img" onChange={(e) => handleChange(e)} />
                      <span>Pegá tu URL</span>
                      <br/>
                      <button className='btn btn-light' onClick={() => handleSubmit()} type='submit'>enviar</button>
                      </form>
                      </Modal>
                      } 
                </div>
              
              : <div className='row'  >No existe el usuario</div>
              
            
          }
      </div>
       </div>
    </div> 
  )
}
