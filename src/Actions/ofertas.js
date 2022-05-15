import axios from "axios";
import { BASEURL } from "../Assets/URLS";


export const getAllOfertas = () => async dispatch => {
   try {
      const { data } = await axios.get(`${BASEURL}/offers`);
      dispatch({ type: "GET_ALL_OFERTAS", payload: data });
   } catch (e) {
      console.log(e.response.data);
   } 
}

export const getOneOferta = (id) => async dispatch => {
   try {
      const res = await axios.get(`${BASEURL}/offers/${id}`);
      const data = res.data;
      return dispatch({ type: "GET_OFERTA_BY_ID", payload: data });
   } catch (err) {
      console.log(err.response.data);
   }
}