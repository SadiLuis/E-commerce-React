import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    GET_USER_DETAIL,
    AUTHENTICATION_ERROR,
    RECOVERY_PASSWORD
} from '../Actions/Index'

const initialState = {
    token: localStorage.getItem('token_ecommerce'),
    isAuth: null,
    userDetail: null,
    recoveryPass:[],
}

export default function loginRegistroReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, isAuth: true, userDetail: action.payload };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // Set Token in localstorage
            localStorage.setItem('token_ecommerce', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
            };
        case REGISTER_FAILED:
        case AUTHENTICATION_ERROR:
        case LOGIN_FAILED:
        case LOGOUT:
            // Eliminamos el token del localStorage y la info del usuario
            localStorage.removeItem('token_ecommerce');
            localStorage.removeItem('cart');
            
            return {
                ...state,
                token: null,
                isAuth: false,
                userDetail: null
            };

        case RECOVERY_PASSWORD:
            return {
                ...state,
                recoveryPass:[...action.payload]
            }

        default: return state;
    }
}