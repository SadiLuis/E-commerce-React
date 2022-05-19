import axios from "axios";
import { BASEURL } from "../Assets/URLS";
import Swal from 'sweetalert2'
import getHeaderToken from '../Helpers/getHeaderToken';

export const getAllFavs = (id) => async (dispatch) => {
try{
    const {data} = await axios.get(`${BASEURL}/favs/${id}`)
dispatch({
    type: 'GET_ALL_FAVS',
    payload: data
})
}catch(err){
    console.log(err)
}    

}

export const postFav = (fav) => async (dispatch) => {
    try{
      const { data } = await axios.post(`${BASEURL}/favs`, fav)
      Swal.fire({
      
        icon: "success",
        title: "Producto agregado a favoritos",
        showConfirmButton: false,
        timer: 1500,
      });

    return dispatch({
          type: 'POST_FAV',
          payload: data
      })

    }catch(err){
        Swal.fire({
            icon: 'error',
            title: err.response.data
             })
    }
}

export const deleteFav = (id) => async (dispatch) => {
    try{
        console.log(id)
        await axios.delete(`${BASEURL}/favs/${id}`)
      const {data} =  await axios.get(`${BASEURL}/user`, getHeaderToken())
        
      dispatch({
            type: 'DELETE_FAV',
            payload: id
        })
    dispatch(getAllFavs(data.id))
    
    }catch(err){
        console.log(err)
    }
}