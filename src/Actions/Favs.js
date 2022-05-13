import axios from "axios";
import { BASEURL } from "../Assets/URLS";

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
      dispatch({
          type: 'POST_FAV',
          payload: data
      })
    }catch(err){
        console.log(err)
    }
}

export const deleteFav = (id) => async (dispatch) => {
    try{
        await axios.delete(`${BASEURL}/favs/${id}`)
        dispatch({
            type: 'DELETE_FAV'
        })
    }catch(err){
        console.log(err)
    }
}