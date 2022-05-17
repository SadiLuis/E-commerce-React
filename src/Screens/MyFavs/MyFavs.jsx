import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getUserDetail} from '../../Actions/Auth';
import { getAllFavs } from '../../Actions/Favs';
import FavCard from '../FavCard/FavCard';
import styles from './MyFavs.module.css'



export default function MyFavs () {

    
const dispatch = useDispatch()
  

React.useEffect(()=> {
        dispatch(getUserDetail())

      }, [dispatch])
   
   
const myUser = useSelector((state)=> state.loginReducer.userDetail)
React.useEffect(()=> {
    dispatch(getAllFavs(myUser?.id))
  }, [myUser])


const favs = useSelector((state) => state.favReducer.myFavs) 
    
      return(
        <div>
        <h1 className={styles.title}>Mis favoritos</h1>
            <div className={styles.container}>

                  { 
                     favs.length ? favs.map((e)=> (
                       <FavCard id={e.productoId}/>
                     )) : <div>Cargando...</div>
                    } 
                    </div>
        </div>
    )
}