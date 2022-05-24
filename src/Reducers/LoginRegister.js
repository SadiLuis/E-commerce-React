import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    GET_USER_DETAIL,
    AUTHENTICATION_ERROR,
    RECOVERY_PASSWORD,
    LOGIN_GOOGLE_FAILED,
    LOGIN_GOOGLE_SUCCESS
} from '../Actions/Index'

const initialState = {
    token: localStorage.getItem('token_ecommerce'),
    isAuth: null,
    userDetail: null,
    isRegister:null,
    recoveryPass:'',
}

export default function loginRegistroReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, isAuth: true, userDetail: action.payload };
        case LOGIN_SUCCESS:
        case LOGIN_GOOGLE_SUCCESS:
            // Set Token in localstorage
            localStorage.setItem('token_ecommerce', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                
            };
        
        case AUTHENTICATION_ERROR:
        case LOGIN_FAILED:
        case LOGIN_GOOGLE_FAILED:
        case LOGOUT:
            // Eliminamos el token del localStorage y la info del usuario
            localStorage.removeItem('token_ecommerce');
           
            
            return {
                ...state,
                token: null,
                isAuth: false,
                userDetail: null
            };

            case RECOVERY_PASSWORD:
                return {
                    ...state,
                    recoveryPass:action.payload.token
                }
            case REGISTER_SUCCESS: return {
                ...state ,
                isRegister: action.payload
            }
            case REGISTER_FAILED: return {
                ...state,
                isRegister: action.payload
            }
            case 'UPDATE_USER_IMG': return {
                ...state
            }
            case 'RESET_REGISTER': return {
                ...state,
                isRegister:null
            }

        default: return state;
    }
}