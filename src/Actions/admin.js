import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

export default function addAdmin(admin){
    return async function (dispatch){
        console.log('add admin')

        const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
        try {
            const postAdmin = await axios.post(`${BASEURL}/admin/addAdmin`, admin, config);
            return dispatch({
                    type: 'ADD_ADMIN',
                    payload: postAdmin.data
                })
        } catch (error) {
            console.log(error)
        }
    }
}