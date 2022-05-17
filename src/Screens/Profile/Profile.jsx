import React,  { useState , useCallback } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers } from '../../Actions/users';
import { getUserDetail, logout, updateUserImg} from '../../Actions/Auth';
import {updateCart} from '../../Actions/cart'
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import Items from '../../Components/Cart/Items';
import styles from './Profile.module.css'
import { getAllFavs } from '../../Actions/Favs';
import FavCard from '../FavCard/FavCard';
import { useDropzone } from "react-dropzone";
import {saveImages} from '../../Helpers/saveImages'
export default function Profile() {
  const [imagen , setImagen] = useState('')
  
  const dispatch = useDispatch()
  
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
  
  React.useEffect(()=> {
    dispatch(getUserDetail())
    dispatch(updateCart())
  }, [dispatch] , imagen)


  React.useEffect(()=> {
    dispatch(getAllFavs(myUser?.id))
  }, [myUser])

  const favs = useSelector((state) => state.favReducer.myFavs) 
  const [input, setInput] = useState({
    img: ""
  })
  const [modalClose, setModalClose] = useState(false)
  console.log(myUser)
  
   const handleChange = (e) => {
     setInput({
       
       [e.target.name] : e.target.value
    })
   }
   
   
   
   
   const handleSubmit = () => {
    //dispatch(updateUserImg(body))
    setModalClose(false)
    setInput({img: ""})
   }

   const handleModel = () => {
    setModalClose(true)
   }
   const handleModalClose = () => {
     setModalClose(false)
   }

  
   /*  let items = useSelector((state) => {
      let completeProducts = state.productsReducer.cart.products;
      completeProducts = completeProducts.map((e) => {
        const finded = state.productsReducer.allProducts.find(
          (el) => el.id === e.id
        );
        return finded ? { ...finded, quantity: e.quantity } : null;
      });
  
      return completeProducts;
    })
  
  items = items?.filter((e) => e); */

  const onDrop = useCallback(async(oFile) => {
    
    console.log(oFile)
    const urlImage = await saveImages(oFile[0]);
     console.log(urlImage)
      setImagen(urlImage)
      let body = {id: myUser?.id, img:urlImage}
      dispatch(updateUserImg(body))
   
}, []);
const { getRootProps, getInputProps} = useDropzone({
  accept: "image/jpeg",
  noKeyboard: true,
  multiple: false,
  onDrop
});

  return (
     <div className='account'>
      <div className={styles.container}> 
      <div className='container'>

{/*     <div className={`row `}>
        <div className={` ${styles.buttons}`}>
          <button className={`btn ${styles.btnLink}`}><Link to='/'>Back to home</Link></button>
            
      
          
        </div>

        </div>
            <div className={`text-left ${styles.containerTitle} `}>
            <h3 className={styles.title}>Mi cuenta</h3>
          </div> */}
            
     
        
        {
         
          myUser?
          <div className={`row ${styles.profileContainer}`}>



            
                <div className={`col col-lg-6 ${styles.profile}`}>
                
                    <div className='text-center'>

                      <div className={` text-center ${styles.profilePicDiv}`}>
                      <img src={myUser.avatar} id="profile" className={` ${styles.profileImg} `}  alt="avatar" />
                      <br/>
                      
                       <button className={`btn  btn-sm ${styles.iconCam}`} {...getRootProps()} ><i className={`bi bi-camera-fill`}></i></button>
                       <input {...getInputProps()}/>
                      </div>
                       
                      <b><p className='mb-3'>{myUser.nombre}</p></b>
                      <p className='mb-3'>Nombre de usuario: <b>{myUser.usuario}</b></p>
                      <p className='mb-3'> email: <b>{myUser.email} </b></p>
                        <Link to={'/orders'}><button className='btn btn-outline-dark'>Historial de pedidos</button></Link>
                       
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
                  <Link to={'/profile/editProfile'}><button className={`btn btn-info ${styles.btnFav}`}>Editar perfil</button></Link>
                    <Link to={'/MyFavs'}><button className={`btn btn-warning ${styles.btnFav}`}>ir a Mis favoritos</button></Link>
            {/*         <div className={styles.Favoritos}>

                        {
                     favs?.map((e)=> (
                       <FavCard id={e.productoId}/>
                     ))
                    } 
                    </div> */}
                   
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
              
              : <div className='row' >No existe el usuario</div>
              
            
          }
      </div>
       </div>
    </div> 
  )
}
