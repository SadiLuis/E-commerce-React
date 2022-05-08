import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import { } from './Index';


export function postNewsletter() {
    return async function () {
        const create = await axios.post(`${BASEURL}/newsletter`, newsletter);
        return create;
    };
}
